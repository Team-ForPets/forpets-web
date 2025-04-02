package com.forpets.be.domain.volunteerwork.dto.response;

import com.forpets.be.domain.volunteerwork.entity.AnimalType;
import com.forpets.be.domain.volunteerwork.entity.VolunteerWork;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class VolunteerWorkResponseDto {

    private final Long id;
    private final String title;
    private final AnimalType animalType;
    private final LocalDate startDate;
    private final LocalDate endDate;
    private final String departureArea;
    private final String arrivalArea;
    private final String notice;
    private final LocalDateTime createdAt;// from BaseTimeEntity
    private final LocalDateTime updatedAt;

    // Static factory method to map from entity to DTO
    public static VolunteerWorkResponseDto from(VolunteerWork entity) {
        return
            VolunteerWorkResponseDto.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .animalType(entity.getAnimalType())
                .notice(entity.getNotice() != null ? entity.getNotice() : "")
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .departureArea(entity.getDepartureArea())
                .arrivalArea(entity.getArrivalArea())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}
