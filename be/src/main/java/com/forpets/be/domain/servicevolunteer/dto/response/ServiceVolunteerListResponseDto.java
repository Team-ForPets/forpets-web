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
public class ServiceVolunteerListResponseDto {


    private final String title;

    private final LocalDate startDate;

    private final LocalDate endDate;

    private final String departureArea;

    private final String arrivalArea;

    private final String imageUrl;

    private Long id;


    public static ServiceVolunteerListResponseDto from(ServiceVolunteer entity, User user) {

        return ServiceVolunteerListResponseDto.builder()

            .id(entity.getId())

            .imageUrl(user != null ? user.getImageUrl()

                : "https://via.placeholder.com/150") // Default image handling

            .title(entity.getTitle())

            .startDate(entity.getStartDate())

            .endDate(entity.getEndDate())

            .departureArea(entity.getDepartureArea())

            .arrivalArea(entity.getArrivalArea())

            .build();

    }

}
