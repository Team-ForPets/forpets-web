package com.forpets.be.global.auth.controller;


import com.forpets.be.domain.user.entity.User;
import com.forpets.be.global.auth.dto.request.LoginRequestDto;
import com.forpets.be.global.auth.dto.request.SignupRequestDto;
import com.forpets.be.global.auth.dto.response.SignupResponseDto;
import com.forpets.be.global.auth.dto.response.TokenResponseDto;
import com.forpets.be.global.auth.service.AuthService;
import com.forpets.be.global.response.ApiResponse;
import com.forpets.be.global.security.jwt.TokenDto;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<SignupResponseDto>> signup(
        @Valid @RequestBody SignupRequestDto RequestDto) {
        return ResponseEntity.ok(
            ApiResponse.ok("회원가입이 완료되었습니다.", "CREATED", authService.signup(RequestDto)));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<TokenResponseDto>> login(
        @Valid @RequestBody LoginRequestDto requestDto, HttpServletResponse response) {
        TokenDto tokenDto = authService.login(requestDto);

        TokenResponseDto tokenResponseDto = new TokenResponseDto(tokenDto.getAccessToken());

        String refreshToken = tokenDto.getRefreshToken();
        Cookie refreshTokenCookie = authService.makeRefreshTokenCookie(refreshToken);

        // HttpServletResponse에 쿠키 추가
        response.addCookie(refreshTokenCookie);

        return ResponseEntity.ok(ApiResponse.ok("로그인이 되었습니다.", "OK", tokenResponseDto));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(
        @RequestHeader("Authorization") String accessToken, @AuthenticationPrincipal User user,
        HttpServletResponse response) {
        authService.logout(accessToken, user);

        Cookie deleteTokenCookie = makeRefreshTokenCookie(null, 0);

        response.addCookie(deleteTokenCookie);

        return ResponseEntity.ok(
            ApiResponse.ok("로그아웃이 되었습니다.", "NO_CONTENT", null));
    }

    // todo : authservice에서 refresh token을 검증하고 만료되었다면 -> 재로그인 요청
    // todo :

    /**
     * todo : authService에 refresh token을 전달하고 tokenDto로 access와 refresh token을 받기
     * refresh token은 만료기간이 2일 남아있으면 재발급??
     * todo : refresh token이 재발급 되지 않으면 access token과 null로 전달 받기
     * todo : refresh token이 null이 아닐 시에 addCookie 사용해서 프런트에 전달
     */
    @PostMapping("/reissue")
    public ResponseEntity<ApiResponse<TokenResponseDto>> reissue(
        @CookieValue(name = "refresh_token", required = false) String refreshToken,
        HttpServletResponse response
    ) {
        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        TokenDto tokenDto = authService.reissue(refreshToken);
        String accessToken = tokenDto.getAccessToken();
        TokenResponseDto tokenResponseDto = new TokenResponseDto(accessToken);

        // todo : tokenDto의 refresh token이 null인 경우와 아닌 경우를 나누고 null이 아니면 쿠키에 담아 프런트로 보낸다.
        int maxAge = 7 * 24 * 60 * 60;
        String reissuedRefreshToken = tokenDto.getRefreshToken();

        if (reissuedRefreshToken != null) {
            Cookie reissuedRefreshtokenCookie = makeRefreshTokenCookie(reissuedRefreshToken,
                maxAge);
            response.addCookie(reissuedRefreshtokenCookie);
        }

        return ResponseEntity.ok(ApiResponse.ok(
            "accessToken 재발급 완료",
            "OK",
            tokenResponseDto
        ));
    }

    public Cookie makeRefreshTokenCookie(String refreshToken, int maxAge) {
        Cookie refreshTokenCookie = new Cookie("refresh_token", refreshToken);
        refreshTokenCookie.setHttpOnly(true);             // 자바스크립트 접근 차단
//        refreshTokenCookie.setSecure(true);             // HTTPS 전송 시에만 쿠키 전달 (HTTPS 환경일 때)
        refreshTokenCookie.setPath("/");                  // 애플리케이션 전체에 대해 유효
        refreshTokenCookie.setMaxAge(maxAge);   // 예: 쿠키 만료시간을 7일로 설정 (초 단위)

        return refreshTokenCookie;
    }

}
