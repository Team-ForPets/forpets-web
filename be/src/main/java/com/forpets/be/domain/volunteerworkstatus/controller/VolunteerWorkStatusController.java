package com.forpets.be.domain.volunteerworkstatus.controller;

import com.forpets.be.domain.user.entity.User;
import com.forpets.be.domain.volunteerworkstatus.dto.request.VolunteerWorkStatusRequestDto;
import com.forpets.be.domain.volunteerworkstatus.dto.response.VolunteerWorkStatusListResponseDto;
import com.forpets.be.domain.volunteerworkstatus.dto.response.VolunteerWorkStatusResponseDto;
import com.forpets.be.domain.volunteerworkstatus.service.VolunteerWorkStatusService;
import com.forpets.be.global.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class VolunteerWorkStatusController {

    private final VolunteerWorkStatusService volunteerWorkStatusService;

    // 이동봉사 현황 생성
    @PostMapping("/volunteer-work-status")
    public ResponseEntity<ApiResponse<VolunteerWorkStatusResponseDto>> createServiceStatus(
        @RequestBody @Valid VolunteerWorkStatusRequestDto requestDto) {
        return ResponseEntity.ok(ApiResponse.ok("이동봉사 현황이 생성되었습니다.", "CREATED",
            volunteerWorkStatusService.createServiceStatus(requestDto)));
    }

    // 이동봉사 현황 전체 조회
    @GetMapping("/volunteer-work-status")
    public ResponseEntity<ApiResponse<VolunteerWorkStatusListResponseDto>> getVolunteerWorkStatuses(
        @RequestParam(value = "status", required = false, defaultValue = "all") String status) {
        return ResponseEntity.ok(
            ApiResponse.ok("이동봉사 현황 리스트가 조회되었습니다.", "OK",
                volunteerWorkStatusService.getVolunteerWorkStatuses(status)));
    }

    // 나의 이동봉사 현황 조회
    @GetMapping("/my/volunteer-work-status")
    public ResponseEntity<ApiResponse<VolunteerWorkStatusListResponseDto>> getMyVolunteerWorkStatus(
        @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.ok(user.getNickname() + "님의 이동봉사 현황이 조회되었습니다.", "OK",
            volunteerWorkStatusService.getMyVolunteerWorkStatus(user)));
    }

    // 이동봉사 현황 삭제
    @DeleteMapping("/volunteer-work-status/{volunteerWorkStatusId}")
    public ResponseEntity<ApiResponse<Void>> deleteVolunteerWorkStatus(
        @PathVariable Long volunteerWorkStatusId) {
        volunteerWorkStatusService.deleteVolunteerWorkStatus(volunteerWorkStatusId);

        return ResponseEntity.ok(ApiResponse.ok("이동봉사 현황이 삭제되었습니다.", "DELETED", null));
    }
}
