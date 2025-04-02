package com.forpets.be.domain.volunteerwork.dto.response;

import com.forpets.be.domain.user.entity.User;
import com.forpets.be.domain.volunteerwork.entity.VolunteerWork;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class VolunteerWorkListResponseDto {

    private final String title;
    private final LocalDate startDate;
    private final LocalDate endDate;
    private final String departureArea;
    private final String arrivalArea;
    private final String imageUrl;
    private Long id;

    public static VolunteerWorkListResponseDto from(VolunteerWork entity, User user) {
        return VolunteerWorkListResponseDto.builder()
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