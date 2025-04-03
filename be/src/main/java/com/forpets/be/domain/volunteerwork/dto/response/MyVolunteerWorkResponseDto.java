package com.forpets.be.domain.volunteerwork.dto.response;

import com.forpets.be.domain.volunteerwork.entity.VolunteerWork;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MyVolunteerWorkResponseDto {

    private final Long id;
    private final String title;
    private final LocalDate startDate;
    private final LocalDate endDate;
    private final String departureArea;
    private final String arrivalArea;
    //    private final String imageUrl;
    private final String breed;
    private final String notice;
    private final LocalDateTime createdAt;// from BaseTimeEntity
    private final LocalDateTime updatedAt;

    public static MyVolunteerWorkResponseDto from(VolunteerWork entity) {
        return MyVolunteerWorkResponseDto.builder()
            .id(entity.getId())
            .title(entity.getTitle())
            .notice(entity.getNotice())
//            .imageUrl(User.)
            .breed(entity.getNotice())
            .startDate(entity.getStartDate())
            .endDate(entity.getEndDate())
            .departureArea(entity.getDepartureArea())
            .arrivalArea(entity.getArrivalArea())
            .createdAt(entity.getCreatedAt())
            .updatedAt(entity.getUpdatedAt())
            .build();
    }


}
