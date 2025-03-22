package com.forpets.be.global.mail.controller;

import com.forpets.be.global.mail.dto.response.AuthenticationCodeResponseDto;
import com.forpets.be.global.mail.service.CodeGenerator;
import com.forpets.be.global.mail.service.MailService;
import com.forpets.be.global.mail.service.VerificationCodeService;
import com.forpets.be.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MailController {

    private final MailService mailService;
    private final VerificationCodeService verificationCodeService;

    @PostMapping("/auth/send-auth-code")
    public ResponseEntity<ApiResponse<String>> sendAuthCode(
        @RequestParam String username) {
        String code = CodeGenerator.generateCode(6);
        verificationCodeService.saveVerificationCode(username, code);
        mailService.sendAuthCodeToEmail(username, code);
        return ResponseEntity.ok(
            ApiResponse.ok("인증코드 전송 성공", "OK", "true"
            ));
    }

    @PostMapping("/auth/verify-code")
    public ResponseEntity<ApiResponse<AuthenticationCodeResponseDto>> verifyCode(
        @RequestParam String username,
        @RequestParam String code) {
        return ResponseEntity.ok(
            ApiResponse.ok("인증 코드", "OK", verificationCodeService.verifyCode(username, code)));
    }
}
