package com.forpets.be.domain.volunteerworkstatus.dto.response;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class VolunteerWorkStatusListResponseDto {

    private final List<VolunteerWorkStatusResponseDto> volunteerworkStatuses;
    private final Integer total;

    public static VolunteerWorkStatusListResponseDto from(
        List<VolunteerWorkStatusResponseDto> volunteerWorkStatusResponseDtos,
        Integer total) {
        return VolunteerWorkStatusListResponseDto.builder()
            .volunteerworkStatuses(volunteerWorkStatusResponseDtos)
            .total(total)
            .build();
    }
}
