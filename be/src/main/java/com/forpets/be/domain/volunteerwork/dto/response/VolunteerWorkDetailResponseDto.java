package com.forpets.be.domain.volunteerwork.dto.response;

import com.forpets.be.domain.user.dto.response.UserNickNameImageResponseDto;
import com.forpets.be.domain.volunteerwork.entity.AnimalType;
import com.forpets.be.domain.volunteerwork.entity.VolunteerWork;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class VolunteerWorkDetailResponseDto {

    private final Long id;
    private final String title;
    private final AnimalType animalType;
    private final LocalDate startDate;
    private final LocalDate endDate;
    private final String departureArea;
    private final String arrivalArea;
    private final String imageUrl;
    private final String notice;
    private final UserNickNameImageResponseDto user;
//  private final User user;

    public static VolunteerWorkDetailResponseDto from(VolunteerWork entity) {
        return VolunteerWorkDetailResponseDto.builder()
            .id(entity.getId())
            .title(entity.getTitle())
            .animalType(entity.getAnimalType())
            .notice(entity.getNotice() != null ? entity.getNotice() : "")
            .startDate(entity.getStartDate())
            .endDate(entity.getEndDate())
            .departureArea(entity.getDepartureArea())
            .arrivalArea(entity.getArrivalArea())
            .user(UserNickNameImageResponseDto.from(entity.getUser()))
            .build();
    }


}
