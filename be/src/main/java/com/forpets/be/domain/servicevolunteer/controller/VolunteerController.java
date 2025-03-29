package com.forpets.be.domain.servicevolunteer.controller;

import com.forpets.be.domain.servicevolunteer.dto.request.ServiceVolunteerRequestDto;
import com.forpets.be.domain.servicevolunteer.dto.response.ServiceVolunteerDetailResponseDto;
import com.forpets.be.domain.servicevolunteer.dto.response.ServiceVolunteerListResponseDto;
import com.forpets.be.domain.servicevolunteer.dto.response.ServiceVolunteerResponseDto;
import com.forpets.be.domain.servicevolunteer.service.VolunteerService;
import com.forpets.be.domain.user.entity.User;
import com.forpets.be.global.response.ApiResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/service-volunteer")
@RequiredArgsConstructor
public class VolunteerController {

    private final VolunteerService volunteerService;

    @PostMapping
    public ResponseEntity<ApiResponse<ServiceVolunteerResponseDto>> createVolunteer(
        // @ 유저정보
        @RequestBody ServiceVolunteerRequestDto requestDto,
        @AuthenticationPrincipal User authenticatedUser
    ) {
        return ResponseEntity.ok(
            ApiResponse.ok(
                "봉사자 등록 글이 완료되었습니다.",
                "CREATED",
                volunteerService.createVolunteer(requestDto, authenticatedUser)));
    }


    @GetMapping
    public ResponseEntity<ApiResponse<List<ServiceVolunteerListResponseDto>>> getVolunteer() {
        List<ServiceVolunteerListResponseDto> volunteers = volunteerService.getAllVolunteers();
        return ResponseEntity.ok(ApiResponse.ok("봉사자 목록 조회 성공", "OK", volunteers));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ServiceVolunteerDetailResponseDto>> getVolunteerById(
        @PathVariable Long id) {
        ServiceVolunteerDetailResponseDto volunteer = volunteerService.getVolunteerById(id);
        return ResponseEntity.ok(ApiResponse.ok("봉사자 목록 조회 성공", "OK", volunteer));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ServiceVolunteerDetailResponseDto>> updateVolunteer(
        @PathVariable Long id,
        @RequestBody ServiceVolunteerRequestDto requestDto,
        @AuthenticationPrincipal User authenticatedUser
    ) {
        // Service Layer 호출하여 수정된 데이터를 가져옴
        ServiceVolunteerDetailResponseDto updatedVolunteer = volunteerService.updateVolunteer(id,
            requestDto, authenticatedUser);

        // 성공 응답 반환
        return ResponseEntity.ok(
            ApiResponse.ok(
                "봉사자 등록글이 수정되었습니다.",
                "UPDATED",
                updatedVolunteer
            )
        );
    }

}
