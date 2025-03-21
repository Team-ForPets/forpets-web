package com.forpets.be.global.auth.controller;


import com.forpets.be.global.auth.dto.request.LoginRequestDto;
import com.forpets.be.global.auth.dto.request.SignupRequestDto;
import com.forpets.be.global.auth.dto.response.AuthenticationCodeResponseDto;
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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
            ApiResponse.ok(
                "회원가입이 완료되었습니다.",
                "CREATED",
                authService.signup(RequestDto)));
    }

    @GetMapping("/auth/email-authentication")
    public ResponseEntity<ApiResponse<AuthenticationCodeResponseDto>> checkNickname(
        @RequestParam String email) {
        return ResponseEntity.ok(
            ApiResponse.ok("인증코드 전송 성공", "OK",
                authService.SendAuthenticationCodeToEmail(email)));
    }


    @PostMapping("/login")
    public ResponseEntity<ApiResponse<TokenResponseDto>> login(
        @Valid @RequestBody LoginRequestDto requestDto,
        HttpServletResponse response
    ) {
        TokenDto tokenDto = authService.login(requestDto);

        TokenResponseDto tokenResponseDto = new TokenResponseDto(tokenDto.getAccessToken());

        String refreshToken = tokenDto.getRefreshToken();
        Cookie refreshTokenCookie = authService.makeRefreshTokenCookie(refreshToken);

        // HttpServletResponse에 쿠키 추가
        response.addCookie(refreshTokenCookie);

        return ResponseEntity.ok(ApiResponse.ok(
            "로그인이 되었습니다.",
            "OK",
            tokenResponseDto
        ));
    }

}
