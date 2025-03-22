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
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

        Cookie deleteTokenCookie = new Cookie("refresh_token", null);
        deleteTokenCookie.setHttpOnly(true);             // 자바스크립트 접근 차단
//        refreshTokenCookie.setSecure(true);             // HTTPS 전송 시에만 쿠키 전달 (HTTPS 환경일 때)
        deleteTokenCookie.setPath("/");                  // 애플리케이션 전체에 대해 유효
        deleteTokenCookie.setMaxAge(0);
        response.addCookie(deleteTokenCookie);

        return ResponseEntity.ok(
            ApiResponse.ok("로그아웃이 되었습니다.", "NO_CONTENT", null));
    }
    
}
