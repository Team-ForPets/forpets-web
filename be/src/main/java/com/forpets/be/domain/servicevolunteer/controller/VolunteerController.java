package com.forpets.be.domain.servicevolunteer.controller;

import com.forpets.be.domain.servicevolunteer.dto.request.ServiceVolunteerRequestDto;
import com.forpets.be.domain.servicevolunteer.dto.response.ServiceVolunteerResponseDto;
import com.forpets.be.domain.servicevolunteer.service.VolunteerService;
import com.forpets.be.domain.user.entity.User;
import com.forpets.be.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class VolunteerController {

    private final VolunteerService volunteerService;

    @PostMapping("/service-volunteer")
    public ResponseEntity<ApiResponse<ServiceVolunteerResponseDto>> serviceVolunteer(
        // @ 유저정보
        @RequestBody ServiceVolunteerRequestDto requestDto,
        @AuthenticationPrincipal User authenticatedUser
    ) {
        return ResponseEntity.ok(
            ApiResponse.ok(
                "봉사자 등록 글이 완료되었습니다.",
                "CREATED",
                volunteerService.serviceVolunteer(requestDto, authenticatedUser)));
    }
}
