package com.forpets.be.domain.servicevolunteer.dto.response;

import com.forpets.be.domain.servicevolunteer.entity.ServiceVolunteer;
import com.forpets.be.domain.user.entity.User;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ServiceVolunteerResponseDto {

    private final String title;
    private final LocalDate startDate;
    private final LocalDate endDate;
    private final String departureArea;
    private final String arrivalArea;

    // Static factory method to map from entity to DTO
    public static ServiceVolunteerResponseDto from(ServiceVolunteer entity, User user) {
        return
            ServiceVolunteerResponseDto.builder()
                .title(entity.getTitle())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .departureArea(entity.getDepartureArea())
                .arrivalArea(entity.getArrivalArea())
                .build();
    }
}
