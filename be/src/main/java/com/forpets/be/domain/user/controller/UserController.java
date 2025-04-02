package com.forpets.be.domain.user.controller;

import com.forpets.be.domain.user.dto.response.UserCheckResponseDto;
import com.forpets.be.domain.user.service.UserService;
import com.forpets.be.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/auth/email-verifications")
    public ResponseEntity<ApiResponse<UserCheckResponseDto>> checkUsername(
        @RequestParam String username) {
        return ResponseEntity.ok(
            ApiResponse.ok("이메일 중복 검증 성공", "OK", userService.checkUsername(username)));
    }

    @GetMapping("/auth/nickname-verifications")
    public ResponseEntity<ApiResponse<UserCheckResponseDto>> checkNickname(
        @RequestParam String nickname) {
        return ResponseEntity.ok(
            ApiResponse.ok("닉네임 중복 검증 성공", "OK", userService.checkNickname(nickname)));
    }
}
