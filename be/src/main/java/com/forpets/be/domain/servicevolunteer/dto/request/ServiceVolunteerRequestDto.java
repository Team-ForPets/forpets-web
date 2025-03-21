package com.forpets.be.domain.servicevolunteer.dto.request;


import com.forpets.be.domain.servicevolunteer.entity.AnimalType;
import com.forpets.be.domain.servicevolunteer.entity.ServiceVolunteer;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ServiceVolunteerRequestDto {

    private String title;
    private AnimalType animalType;
    private LocalDate startDate;
    private LocalDate endDate;
    private String departureArea;
    private String arrivalArea;
    private String notice;

    // body로 받은 데이터를 엔티티 타입으로

    public ServiceVolunteer toEntity() {

        return ServiceVolunteer.builder()
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
