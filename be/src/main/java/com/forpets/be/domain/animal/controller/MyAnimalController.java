package com.forpets.be.domain.animal.controller;

import com.forpets.be.domain.animal.dto.request.MyAnimalCreateRequestDto;
import com.forpets.be.domain.animal.dto.response.AnimalsResponseDto;
import com.forpets.be.domain.animal.dto.response.MyAnimalReadResponseDto;
import com.forpets.be.domain.animal.service.MyAnimalService;
import com.forpets.be.domain.user.entity.User;
import com.forpets.be.global.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MyAnimalController {

    private final MyAnimalService myAnimalService;

    @PostMapping("/animals")
    public ResponseEntity<ApiResponse<MyAnimalReadResponseDto>> createMyAnimal(
        @Valid @RequestBody MyAnimalCreateRequestDto createRequestDto,
        @AuthenticationPrincipal User user
    ) {
        myAnimalService.createMyAnimal(createRequestDto, user);

        return ResponseEntity.ok(ApiResponse.ok(
            "나의 아이가 등록 되었습니다",
            "OK",
            null
        ));
    }

    @GetMapping("/animals")
    public ResponseEntity<ApiResponse<AnimalsResponseDto>> getAnimals() {

        return ResponseEntity.ok(ApiResponse.ok(
            "등록된 모든 나의 아이 조회 성공",
            "OK",
            myAnimalService.getAnimals()
        ));
    }
}
