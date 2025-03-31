package com.forpets.be.domain.volunteerworkstatus.controller;

import com.forpets.be.domain.volunteerworkstatus.dto.request.VolunteerWorkStatusRequestDto;
import com.forpets.be.domain.volunteerworkstatus.dto.response.VolunteerWorkStatusListResponseDto;
import com.forpets.be.domain.volunteerworkstatus.dto.response.VolunteerWorkStatusResponseDto;
import com.forpets.be.domain.volunteerworkstatus.service.VolunteerWorkStatusService;
import com.forpets.be.global.response.ApiResponse;
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
@RequestMapping("/api/volunteer-work-status")
@RequiredArgsConstructor
public class VolunteerWorkStatusController {

    private final VolunteerWorkStatusService volunteerWorkStatusService;

    // 이동봉사 현황 생성
    @PostMapping
    public ResponseEntity<ApiResponse<VolunteerWorkStatusResponseDto>> createServiceStatus(
        @RequestBody @Valid VolunteerWorkStatusRequestDto requestDto) {
        return ResponseEntity.ok(ApiResponse.ok("이동봉사 현황이 생성되었습니다.", "CREATED",
            volunteerWorkStatusService.createServiceStatus(requestDto)));
    }

    // 이동봉사 현황 전체 조회
    @GetMapping
    public ResponseEntity<ApiResponse<VolunteerWorkStatusListResponseDto>> getVolunteerWorkStatuses(
        @RequestParam(value = "status", required = false, defaultValue = "all") String status) {
        return ResponseEntity.ok(
            ApiResponse.ok("이동봉사 현황 리스트가 조회되었습니다.", "OK",
                volunteerWorkStatusService.getVolunteerWorkStatuses(status)));
    }
}
