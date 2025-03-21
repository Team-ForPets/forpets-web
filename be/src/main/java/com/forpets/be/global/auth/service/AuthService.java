package com.forpets.be.global.auth.service;


import com.forpets.be.domain.user.entity.User;
import com.forpets.be.domain.user.repository.UserRepository;
import com.forpets.be.global.auth.dto.request.LoginRequestDto;
import com.forpets.be.global.auth.dto.request.SignupRequestDto;
import com.forpets.be.global.auth.dto.response.SignupResponseDto;
import com.forpets.be.global.security.jwt.JwtTokenProvider;
import com.forpets.be.global.security.jwt.TokenDto;
import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final MailSender mailSender;

    @Transactional
    public SignupResponseDto signup(SignupRequestDto requestDto) {
        if (userRepository.existsByUsername(requestDto.getUsername())) {
            throw new IllegalArgumentException("이미 사용중인 이메일입니다.");
        }
        if (userRepository.existsByNickname(requestDto.getNickname())) {
            throw new IllegalArgumentException("이미 사용중인 닉네임입니다.");
        }
        // 비밀번호 암호와
        // requestDto를 통해 비밀번호를 가져온 뒤 passwordEncoder의 encode 메서드를 통해 암호화 후 저장
        String encodedPassword = passwordEncoder.encode(requestDto.getPassword());
        // 암호화 한 비밀번호를 repository에 넘겨 DB에 저장해야 하니 toEntity로 바꾸고 user로 저장
        User user = requestDto.toEntity(encodedPassword);
        // user data를 DB에 저장 후 ResponseDto에 매칭되는 데이터 반환
        return SignupResponseDto.from(userRepository.save(user));
    }

    public TokenDto login(LoginRequestDto requestDto) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                requestDto.getUsername(),
                requestDto.getPassword()
            )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String accessToken = jwtTokenProvider.createAccessToken(authentication);
        String refreshToken = jwtTokenProvider.createRefreshToken(requestDto.getUsername());

        return new TokenDto(accessToken, refreshToken);
    }

    public Cookie makeRefreshTokenCookie(String refreshToken) {
        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);             // 자바스크립트 접근 차단
//        refreshTokenCookie.setSecure(true);             // HTTPS 전송 시에만 쿠키 전달 (HTTPS 환경일 때)
        refreshTokenCookie.setPath("/");                  // 애플리케이션 전체에 대해 유효
        refreshTokenCookie.setMaxAge(7 * 24 * 60 * 60);   // 예: 쿠키 만료시간을 7일로 설정 (초 단위)

        return refreshTokenCookie;
    }

    public void SendAuthenticationCodeToEmail(String emailAddress) {

        SimpleMailMessage msg = new SimpleMailMessage();
        // 받는 사람 이메일
        msg.setTo(emailAddress);
        // 이메일 제목
        msg.setSubject("Test Subject");
        // 이메일 내용
        msg.setText("this is email test");

        try {
            // 메일 보내기
            this.mailSender.send(msg);
            System.out.println("이메일 전송 성공!");
        } catch (MailException e) {
            throw e;
        }
    }


}
