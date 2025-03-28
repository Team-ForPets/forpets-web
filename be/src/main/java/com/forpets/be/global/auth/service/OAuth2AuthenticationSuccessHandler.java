package com.forpets.be.global.auth.service;


import com.forpets.be.domain.user.entity.User;
import com.forpets.be.domain.user.repository.UserRepository;
import com.forpets.be.global.redis.RedisRepository;
import com.forpets.be.global.security.jwt.JwtTokenProvider;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final static String URI = "/auth/success";
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final RedisRepository redisRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,

        Authentication authentication) throws IOException {
        log.info("OAuth2AuthenticationSuccessHandler 실행됨");

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        log.info("OAuth2User 정보 : {}", oAuth2User.getAttributes());

        // provider 구별용 변수명
        String provider = ((OAuth2AuthenticationToken) authentication).getAuthorizedClientRegistrationId();

        String email = "";
        // 구글은 그냥 가져오지만 카카오, 네이버는 따로 설정해줘야 함.
        if ("google".equals(provider)) {
            email = (String) oAuth2User.getAttributes().get("email");
            log.info("네이버 oAuth2 유저정보 : {}", oAuth2User.getAttributes());
        } else if ("kakao".equals(provider)) {
            Map<String, Object> kakaoAccount = (Map<String, Object>) oAuth2User.getAttributes()
                .get("kakao_account");
            email = (String) kakaoAccount.get("email");
            log.info("네이버 oAuth2 유저정보 : {}", oAuth2User.getAttributes());
        } else if ("naver".equals(provider)) {
            Map<String, Object> responseMap = (Map<String, Object>) oAuth2User.getAttributes()
                .get("response");
            email = (String) responseMap.get("email");
//            email = (String) responseMap.get("email_address");    # 검수 후 사용
            log.info("네이버 oAuth2 유저정보 : {}", oAuth2User.getAttributes());
        }

        log.info("로그인한 사용자 email:{}", email);

        User user = userRepository.findByUsername(email)
            .orElseThrow(() -> new RuntimeException("사용자 정보를 찾을 수 없습니다."));

        // JWT 발급
        String accessToken = jwtTokenProvider.createAccessToken(user.getUsername());
        log.info("Access Token: {}", accessToken);
        String refreshToken = jwtTokenProvider.createRefreshToken(user.getUsername());
        log.info("Refresh Token: {}", refreshToken);

        // RefreshToken 저장 (선택)
        redisRepository.storeRefreshToken(user.getUsername(), refreshToken);
        log.info("RefreshToken 저장 완료");

        // RefreshToken을 HttpOnly 쿠키로 설정
        Cookie refreshTokenCookie = new Cookie("refresh_token", refreshToken);
        refreshTokenCookie.setHttpOnly(true);  // XSS 공격 방지
        refreshTokenCookie.setSecure(true);  // HTTPS에서만 전송 (개발 환경에서는 false로 변경 가능)
        refreshTokenCookie.setPath("/");  // 모든 경로에서 사용 가능
        refreshTokenCookie.setMaxAge(7 * 24 * 60 * 60);  // 7일 동안 유지 (초 단위) (refreshToken의 길이만큼)

        response.addCookie(refreshTokenCookie); // 응답에 쿠키 추가
        log.info("RefreshToken 쿠키 저장 완료");

        String targetUrl =
            "http://localhost:5173/social-login?accessToken=" + accessToken + "&username=" + email;

        log.info("프론트로 리디렉트: {}", targetUrl);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);

    }
}
