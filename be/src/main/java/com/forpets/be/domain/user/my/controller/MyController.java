package com.forpets.be.domain.user.my.controller;

import com.forpets.be.domain.user.dto.response.UserCheckResponseDto;
import com.forpets.be.domain.user.entity.User;
import com.forpets.be.domain.user.my.dto.request.UserPasswordRequestRecord;
import com.forpets.be.domain.user.my.dto.response.MyProfileResponseDto;
import com.forpets.be.domain.user.my.service.MyService;
import com.forpets.be.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/my")
public class MyController {

    private final MyService myService;

    // 나의 프로필(회원정보) 조회
    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<MyProfileResponseDto>> getMyProfile(
        @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(
            ApiResponse.ok("프로필 정보가 조회되었습니다.", "OK", myService.getMyProfile(user)));
    }

    // 회원정보 수정 시 비밀번호 검증
    @GetMapping("/profile/password-verifications")
    public ResponseEntity<ApiResponse<UserCheckResponseDto>> checkPassword(
        @RequestBody UserPasswordRequestRecord requestRecord,
        @AuthenticationPrincipal User user) {

        return ResponseEntity.ok(ApiResponse.ok("비밀번호 검증이 완료되었습니다.", "OK",
            myService.checkPassword(requestRecord, user)));
    }
}
