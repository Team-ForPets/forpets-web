package com.forpets.be.global.auth.service;


import com.forpets.be.domain.user.entity.User;
import com.forpets.be.domain.user.repository.UserRepository;
import com.forpets.be.global.auth.dto.request.LoginRequestDto;
import com.forpets.be.global.auth.dto.request.SignupRequestDto;
import com.forpets.be.global.auth.dto.response.SignupResponseDto;
import com.forpets.be.global.redis.RedisRepository;
import com.forpets.be.global.security.jwt.JwtTokenProvider;
import com.forpets.be.global.security.jwt.TokenDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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


    public static final int REFRESH_TOKEN_EXPIRY_THRESHOLD = 2;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisRepository redisRepository;

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
        redisRepository.storeRefreshToken(username, refreshToken);

        return new TokenDto(accessToken, refreshToken);
    }

    public void logout(String accessToken, User user) {
        String username = user.getUsername();
        redisRepository.deleteRefreshToken(username);
        redisRepository.storeBlackListToken(username, accessToken);
    }

    public TokenDto reissueToken(String refreshToken) {
        String newAccessToken;
        String newRefreshToken = null;
        String username = jwtTokenProvider.getUsername(refreshToken);
        String storedRefreshToken = redisRepository.getRefreshToken(username);

        if (refreshToken.equals(storedRefreshToken)) {
            long remainingDays = redisRepository.getTTL(username);

            if (remainingDays <= REFRESH_TOKEN_EXPIRY_THRESHOLD) {
                newRefreshToken = jwtTokenProvider.createRefreshToken(username);
            }

        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "유효하지 않은 refresh token입니다.");
        }

        newAccessToken = jwtTokenProvider.createAccessToken(username);

        return new TokenDto(newAccessToken, newRefreshToken);
    }


}
