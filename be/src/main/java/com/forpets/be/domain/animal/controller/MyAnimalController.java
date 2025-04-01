package com.forpets.be.domain.animal.controller;

import com.forpets.be.domain.animal.dto.request.MyAnimalCreateRequestDto;
import com.forpets.be.domain.animal.dto.request.MyAnimalUpdateRequestDto;
import com.forpets.be.domain.animal.dto.response.AnimalsResponseDto;
import com.forpets.be.domain.animal.dto.response.MyAnimalResponseDto;
import com.forpets.be.domain.animal.service.MyAnimalService;
import com.forpets.be.domain.user.entity.User;
import com.forpets.be.global.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MyAnimalController {

    private final MyAnimalService myAnimalService;

    @PostMapping("/animals")
    public ResponseEntity<ApiResponse<MyAnimalResponseDto>> createMyAnimal(
        @Valid @RequestPart(value = "data") MyAnimalCreateRequestDto createRequestDto,
        @RequestPart(value = "file", required = false) MultipartFile file,
        @AuthenticationPrincipal User user

    ) {
        log.info("file : {}", file.getOriginalFilename());
        return ResponseEntity.ok(ApiResponse.ok(
            "나의 아이가 등록 되었습니다",
            "CREATED",
            myAnimalService.createMyAnimal(createRequestDto, user, file)
        ));
    }

    // 등록된 모든 나의 아이 조회
    @GetMapping("/animals")
    public ResponseEntity<ApiResponse<AnimalsResponseDto>> getAnimals() {

        return ResponseEntity.ok(ApiResponse.ok(
            "등록된 모든 나의 아이 조회 성공",
            "OK",
            myAnimalService.getAnimals()
        ));
    }

    // 개별 나의 아이의 상세 조회
    @GetMapping("/animals/{myAnimalId}")
    public ResponseEntity<ApiResponse<MyAnimalResponseDto>> getAnimalDetail(
        @PathVariable Long myAnimalId
    ) {

        return ResponseEntity.ok(ApiResponse.ok(
            "해당 아이디의 나의 아이 조회 성공",
            "OK",
            myAnimalService.getAnimalDetail(myAnimalId)
        ));
    }

    // 사용자별 나의 아이 전체 조회
    @GetMapping("/my/animals")
    public ResponseEntity<ApiResponse<AnimalsResponseDto>> getMyAnimals(
        @AuthenticationPrincipal User user
    ) {

        Long userId = user.getId();

        return ResponseEntity.ok(ApiResponse.ok(
            "해당 유저의 나의 아이 전체 조회 성공",
            "OK",
            myAnimalService.getMyAnimals(userId)
        ));
    }

    @PutMapping("/my/animals/{myAnimalId}")
    public ResponseEntity<ApiResponse<MyAnimalResponseDto>> updateMyAnimal(
        @PathVariable Long myAnimalId,
        @Valid @RequestPart(value = "data") MyAnimalUpdateRequestDto updateRequestDto,
        @RequestPart(value = "file", required = false) MultipartFile file
    ) {
        return ResponseEntity.ok(ApiResponse.ok(
            "해당 나의 아이 업데이트 성공",
            "UPDATED",
            myAnimalService.updateMyAnimal(myAnimalId, updateRequestDto, file)
        ));
    }

    @DeleteMapping("/my/animals/{myAnimalId}")
    public ResponseEntity<ApiResponse> deleteMyAnimal(
        @PathVariable Long myAnimalId
    ) {
        myAnimalService.deleteMyAnimal(myAnimalId);

        return ResponseEntity.ok(ApiResponse.ok(
            "해당 나의 아이 삭제 성공",
            "DELETED",
            null
        ));
    }
}
