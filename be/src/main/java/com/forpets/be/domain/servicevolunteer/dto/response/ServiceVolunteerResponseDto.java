package com.forpets.be.domain.servicevolunteer.dto.response;

import com.forpets.be.domain.servicevolunteer.entity.AnimalType;
import com.forpets.be.domain.servicevolunteer.entity.ServiceVolunteer;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServiceVolunteerResponseDto {

    private String title;
    private AnimalType animalType;
    private LocalDate startDate;
    private LocalDate endDate;
    private String departureArea;
    private String arrivalArea;
    private String notice;
    private LocalDateTime createdAt;// from BaseTimeEntity
    private LocalDateTime updatedAt;

    // Static factory method to map from entity to DTO
    public static ServiceVolunteerResponseDto from(ServiceVolunteer entity) {
        return
            ServiceVolunteerResponseDto.builder()
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
