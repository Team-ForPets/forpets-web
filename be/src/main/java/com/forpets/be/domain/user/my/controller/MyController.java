package com.forpets.be.domain.user.my.controller;

import com.forpets.be.domain.user.dto.response.UserCheckResponseDto;
import com.forpets.be.domain.user.entity.User;
import com.forpets.be.domain.user.my.dto.request.MyProfileUpdateRequestDto;
import com.forpets.be.domain.user.my.dto.request.UserPasswordRequestRecord;
import com.forpets.be.domain.user.my.dto.response.MyProfileResponseDto;
import com.forpets.be.domain.user.my.dto.response.MyProfileUpdateResponseDto;
import com.forpets.be.domain.user.my.service.MyService;
import com.forpets.be.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
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

    // 마이페이지 회원정보 수정 시 비밀번호 검증
    @PostMapping("/profile/password-verifications")
    public ResponseEntity<ApiResponse<UserCheckResponseDto>> checkPassword(
        @RequestBody UserPasswordRequestRecord requestRecord,
        @AuthenticationPrincipal User user) {

        return ResponseEntity.ok(ApiResponse.ok("비밀번호 검증이 완료되었습니다.", "OK",
            myService.checkPassword(requestRecord, user)));
    }

    // 마이페이지 회원정보 수정
    @PatchMapping("/profile")
    public ResponseEntity<ApiResponse<MyProfileUpdateResponseDto>> updateUserInfo(
        @RequestPart(value = "data", required = false) MyProfileUpdateRequestDto requestDto,
        @RequestPart(value = "file", required = false) MultipartFile file,
        @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.ok("회원정보가 수정되었습니다.", "UPDATED",
            myService.updateUserInfo(requestDto, file, user)));
    }
}
