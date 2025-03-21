package com.forpets.be.domain.servicevolunteer.dto.response;

import com.forpets.be.domain.servicevolunteer.entity.AnimalType;
import com.forpets.be.domain.servicevolunteer.entity.ServiceVolunteer;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ServiceVolunteerResponseDto {

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
    public static ServiceVolunteerResponseDto from(ServiceVolunteer entity) {
        return
            ServiceVolunteerResponseDto.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .animalType(entity.getAnimalType())
                .departureArea(entity.getDepartureArea())
                .arrivalArea(entity.getArrivalArea())
                .notice(entity.getNotice() != null ? entity.getNotice() : "")
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}
