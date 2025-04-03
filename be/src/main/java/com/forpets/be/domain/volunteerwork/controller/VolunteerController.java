package com.forpets.be.domain.volunteerwork.controller;

import com.forpets.be.domain.user.entity.User;
import com.forpets.be.domain.volunteerwork.dto.request.VolunteerWokrUpdateRequestDto;
import com.forpets.be.domain.volunteerwork.dto.request.VolunteerWorkRequestDto;
import com.forpets.be.domain.volunteerwork.dto.response.MyVolunteerWorkListResponseDto;
import com.forpets.be.domain.volunteerwork.dto.response.VolunteerWorkDetailResponseDto;
import com.forpets.be.domain.volunteerwork.dto.response.VolunteerWorkListResponseDto;
import com.forpets.be.domain.volunteerwork.dto.response.VolunteerWorkResponseDto;
import com.forpets.be.domain.volunteerwork.service.VolunteerWorkService;
import com.forpets.be.global.response.ApiResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class VolunteerController {

    private final VolunteerWorkService volunteerWorkService;

    @PostMapping("/volunteer-work")
    public ResponseEntity<ApiResponse<VolunteerWorkResponseDto>> createVolunteer(
        // @ 유저정보
        @RequestBody VolunteerWorkRequestDto requestDto,
        @AuthenticationPrincipal User authenticatedUser
    ) {
        return ResponseEntity.ok(
            ApiResponse.ok(
                "봉사자 등록 글이 완료되었습니다.",
                "CREATED",
                volunteerWorkService.createVolunteer(requestDto, authenticatedUser)));
    }


    @GetMapping("/volunteer-work")
    public ResponseEntity<ApiResponse<List<VolunteerWorkListResponseDto>>> getVolunteer() {
        List<VolunteerWorkListResponseDto> volunteers = volunteerWorkService.getAllVolunteers();
        return ResponseEntity.ok(ApiResponse.ok("봉사자 등록글 목록 조회 성공", "OK", volunteers));
    }

    @GetMapping("/volunteer-work/{id}")
    public ResponseEntity<ApiResponse<VolunteerWorkDetailResponseDto>> getVolunteerById(
        @PathVariable Long id) {
        VolunteerWorkDetailResponseDto volunteer = volunteerWorkService.getVolunteerById(id);
        return ResponseEntity.ok(ApiResponse.ok("봉사자 등록글 개별 목록 조회 성공", "OK", volunteer));
    }

    @PutMapping("/volunteer-work/{id}")
    public ResponseEntity<ApiResponse<VolunteerWorkResponseDto>> updateVolunteer(
        @PathVariable Long id,
        @RequestBody VolunteerWokrUpdateRequestDto requestDto
//        @AuthenticationPrincipal User authenticatedUser
    ) {
        // 성공 응답 반환
        return ResponseEntity.ok(
            ApiResponse.ok(
                "봉사자 등록글이 수정되었습니다.",
                "UPDATED",
                volunteerWorkService.updateVolunteer(id, requestDto)
            )
        );
    }

    @DeleteMapping("/volunteer-work/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteVolunteer(@PathVariable Long id) {
        volunteerWorkService.deleteVolunteer(id);
        return ResponseEntity.ok(ApiResponse.ok("봉사자 등록글이 삭제되었습니다.", "DELETED", null));
    }

    @GetMapping("/my/volunteer-posts")
    public ResponseEntity<ApiResponse<MyVolunteerWorkListResponseDto>> getMyVolunteerPost(
        @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(
            ApiResponse.ok("내 봉사글 조회 성공", "OK", volunteerWorkService.getMyVolunteerPost(user)));
    }
}
