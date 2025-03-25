package com.forpets.be.global.auth.service;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.forpets.be.domain.user.entity.User;
import com.forpets.be.domain.user.repository.UserRepository;
import com.forpets.be.global.auth.dto.response.OAuth2ResponseDto;
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

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    //    private final AuthService authService;
    private final RedisRepository redisRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
        Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        log.info(String.valueOf(request));

        // OAuth2User에서 사용자 정보 가져오기
        String email = (String) oAuth2User.getAttributes().get("email");

        // provider 구별용 변수명
        String provider = ((OAuth2AuthenticationToken) authentication).getAuthorizedClientRegistrationId();

        Object kakaoAccountObj = oAuth2User.getAttributes().get("kakao_account");

//        if ("kakao".equals(provider)) {
//            Map<String, Object> kakaoAccount = (Map<String, Object>) oAuth2User.getAttributes()
//                .get("kakao_account");
//            email = kakaoAccount != null ? (String) kakaoAccount.get("email") : null;
//??????????????
        if (kakaoAccountObj instanceof Map) {
            Map<String, Object> kakaoAccount = (Map<String, Object>) kakaoAccountObj;
            email = (String) kakaoAccount.get("email");
        } else {
            email = (String) oAuth2User.getAttributes().get("email");
        }
        User user = userRepository.findByUsername(email)
            .orElseThrow(() -> new RuntimeException("사용자 정보를 찾을 수 없습니다."));

//        UsernamePasswordAuthenticationToken authentication =
//            new UsernamePasswordAuthenticationToken(user, null);

        // JWT 발급
        String accessToken = jwtTokenProvider.createAccessToken(user.getUsername());
        log.info("Access Token: {}", accessToken);
        String refreshToken = jwtTokenProvider.createRefreshToken(user.getUsername());
        log.info("Refresh Token: {}", refreshToken);

        // RefreshToken 저장 (선택)
        redisRepository.storeRefreshToken(user.getUsername(), refreshToken);

        // ✅ RefreshToken을 HttpOnly 쿠키로 설정
        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);  // XSS 공격 방지
        refreshTokenCookie.setSecure(true);  // HTTPS에서만 전송 (개발 환경에서는 false로 변경 가능)
        refreshTokenCookie.setPath("/");  // 모든 경로에서 사용 가능
        refreshTokenCookie.setMaxAge(7 * 24 * 60 * 60);  // 7일 동안 유지 (초 단위) (refreshToken의 길이만큼)

        response.addCookie(refreshTokenCookie); // 응답에 쿠키 추가

        OAuth2ResponseDto responseDto = OAuth2ResponseDto.builder()
            .id(user.getId())
            .username(user.getUsername())
            .accessToken(accessToken)
//            .refreshToken(refreshToken)
            .build();

        // ✅ JSON으로 응답
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(new ObjectMapper().writeValueAsString(responseDto));
        response.sendRedirect("http://localhost:5173");
    }
}
