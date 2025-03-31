package com.forpets.be.domain.volunteerworkstatus.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VolunteerWorkStatusRequestDto {

    @NotNull(message = "나의 아이 id는 필수 입력값입니다.")
    private Long myAnimalId;
    @NotNull(message = "요청자 id는 필수 입력값입니다.")
    private Long requestorId;
    @NotNull(message = "봉사자 id는 필수 입력값입니다.")
    private Long volunteerId;
}
