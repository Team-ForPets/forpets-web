package com.forpets.be.domain.volunteerwork.dto.request;


import com.forpets.be.domain.volunteerwork.entity.AnimalType;
import com.forpets.be.domain.volunteerwork.entity.VolunteerWork;
import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Getter
@NoArgsConstructor
@Slf4j
public class VolunteerWorkRequestDto {

    private String title;
    private AnimalType animalType;
    private LocalDate startDate;
    private LocalDate endDate;
    private String departureArea;
    private String arrivalArea;
    private String notice;

    // body로 받은 데이터를 엔티티 타입으로

    public VolunteerWork toEntity() {
        return VolunteerWork.builder()
            .title(this.title)
            .animalType(this.animalType)
            .startDate(this.startDate)
            .endDate(this.endDate)
            .departureArea(this.departureArea)
            .arrivalArea(this.arrivalArea)
            .notice(this.notice)
            .build();
    }
}
