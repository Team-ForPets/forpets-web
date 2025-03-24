package com.forpets.be.global.auth.controller;


import static com.forpets.be.global.util.CookieMaker.MAX_AGE;
import static com.forpets.be.global.util.CookieMaker.makeRefreshTokenCookie;

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
        Cookie refreshTokenCookie = makeRefreshTokenCookie(refreshToken, MAX_AGE);

        response.addCookie(refreshTokenCookie);

        return ResponseEntity.ok(ApiResponse.ok("로그인이 되었습니다.", "OK", tokenResponseDto));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(
        @RequestHeader("Authorization") String bearerAccessToken,
        @AuthenticationPrincipal User user,
        HttpServletResponse response) {
        String accessToken = bearerAccessToken.substring(7);

        authService.logout(accessToken, user);

        Cookie deleteTokenCookie = makeRefreshTokenCookie(null, 0);

        response.addCookie(deleteTokenCookie);

        return ResponseEntity.ok(
            ApiResponse.ok("로그아웃이 되었습니다.", "NO_CONTENT", null));
    }

    @PostMapping("/reissue")
    public ResponseEntity<ApiResponse<TokenResponseDto>> reissueToken(
        @CookieValue(name = "refresh_token", required = false) String refreshToken,
        HttpServletResponse response
    ) {

        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        TokenDto tokenDto = authService.reissueToken(refreshToken);
        String newAccessToken = tokenDto.getAccessToken();
        TokenResponseDto tokenResponseDto = new TokenResponseDto(newAccessToken);

        String reissuedRefreshToken = tokenDto.getRefreshToken();

        if (reissuedRefreshToken != null) {
            Cookie reissuedRefreshtokenCookie = makeRefreshTokenCookie(reissuedRefreshToken,
                MAX_AGE);
            response.addCookie(reissuedRefreshtokenCookie);
        }

        return ResponseEntity.ok(ApiResponse.ok(
            "accessToken 재발급 완료",
            "OK",
            tokenResponseDto
        ));
    }
}
