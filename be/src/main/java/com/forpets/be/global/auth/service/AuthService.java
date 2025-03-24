package com.forpets.be.global.auth.service;


import com.forpets.be.domain.user.entity.User;
import com.forpets.be.domain.user.repository.UserRepository;
import com.forpets.be.global.auth.dto.request.LoginRequestDto;
import com.forpets.be.global.auth.dto.request.SignupRequestDto;
import com.forpets.be.global.auth.dto.response.SignupResponseDto;
import com.forpets.be.global.security.jwt.JwtTokenProvider;
import com.forpets.be.global.security.jwt.TokenDto;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AuthService {

    public static final String KEY_REFRESH = "refresh_token:";
    public static final String KEY_BLACKLIST = "black_list:";
    public static final int REDIS_BLACKLIST_TOKEN_TIMEOUT = 10;
    public static final int REDIS_REFRESH_TOKEN_TIMEOUT = 7;
    public static final int REFRESH_TOKEN_EXPIRY_THRESHOLD = 2;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final StringRedisTemplate stringRedisTemplate;

    @Transactional
    public SignupResponseDto signup(SignupRequestDto requestDto) {
        if (userRepository.existsByUsername(requestDto.getUsername())) {
            throw new IllegalArgumentException("이미 사용중인 이메일입니다.");
        }
        if (userRepository.existsByNickname(requestDto.getNickname())) {
            throw new IllegalArgumentException("이미 사용중인 닉네임입니다.");
        }
        // 비밀번호 암호화
        // requestDto를 통해 비밀번호를 가져온 뒤 passwordEncoder의 encode 메서드를 통해 암호화 후 저장
        String encodedPassword = passwordEncoder.encode(requestDto.getPassword());
        // 암호화 한 비밀번호를 repository에 넘겨 DB에 저장해야 하니 toEntity로 바꾸고 user로 저장
        User user = requestDto.toEntity(encodedPassword);
        // user data를 DB에 저장 후 ResponseDto에 매칭되는 데이터 반환
        return SignupResponseDto.from(userRepository.save(user));
    }

    public TokenDto login(LoginRequestDto requestDto) {
        String username = requestDto.getUsername();

        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                username,
                requestDto.getPassword()
            )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String accessToken = jwtTokenProvider.createAccessToken(authentication.getName());
        String refreshToken = jwtTokenProvider.createRefreshToken(username);
        storeRefreshToken(username, refreshToken);

        return new TokenDto(accessToken, refreshToken);
    }

    public void logout(String accessToken, User user) {
        String username = user.getUsername();
        deleteRefreshToken(username);
        storeBlackListToken(username, accessToken);
    }

    public TokenDto reissueToken(String refreshToken) {
        String newAccessToken;
        String newRefreshToken = null;
        String username = jwtTokenProvider.getUsername(refreshToken);
        String storedRefreshToken = getRefreshToken(username);

        if (refreshToken.equals(storedRefreshToken)) {
            long remainingDays = getTTL(username);

            if (remainingDays <= REFRESH_TOKEN_EXPIRY_THRESHOLD) {
                newRefreshToken = jwtTokenProvider.createRefreshToken(username);
            }

        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 refresh token입니다.");
        }

        newAccessToken = jwtTokenProvider.createAccessToken(username);

        return new TokenDto(newAccessToken, newRefreshToken);
    }


    // 사용자 ID에 해당하는 토큰을 저장하고, 10일 후 만료되도록 설정.
    public void storeBlackListToken(String username, String token) {
        String key = KEY_BLACKLIST + username;  // key 예: "token:user123"
        stringRedisTemplate.opsForValue()
            .set(key, token, REDIS_BLACKLIST_TOKEN_TIMEOUT, TimeUnit.DAYS);
    }

    // 사용자 ID에 해당하는 토큰을 저장하고, 7일 후 만료되도록 설정.
    public void storeRefreshToken(String username, String token) {
        String key = KEY_REFRESH + username;  // key 예: "token:user123"
        stringRedisTemplate.opsForValue()
            .set(key, token, REDIS_REFRESH_TOKEN_TIMEOUT, TimeUnit.DAYS);
    }

    // 저장된 토큰을 조회하는 메서드
    public String getBlackListToken(String username) {
        String key = KEY_BLACKLIST + username;
        return stringRedisTemplate.opsForValue().get(key);
    }

    public String getRefreshToken(String username) {
        String key = KEY_REFRESH + username;
        return stringRedisTemplate.opsForValue().get(key);
    }

    // 토큰을 삭제 메서드
    public void deleteBlackListToken(String username) {
        String key = KEY_BLACKLIST + username;
        stringRedisTemplate.delete(key);
    }

    public void deleteRefreshToken(String username) {
        String key = KEY_REFRESH + username;
        stringRedisTemplate.delete(key);
    }

    // 지정된 키의 TTL을 일 단위로 반환합니다.
    public long getTTL(String username) {
        String key = KEY_REFRESH + username;
        return stringRedisTemplate.getExpire(key, TimeUnit.DAYS);
    }
}
