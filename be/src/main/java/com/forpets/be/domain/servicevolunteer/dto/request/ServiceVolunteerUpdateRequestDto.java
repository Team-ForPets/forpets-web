package com.forpets.be.domain.servicevolunteer.dto.request;

import com.forpets.be.domain.servicevolunteer.entity.AnimalType;
import java.time.LocalDate;
import lombok.Getter;

@Getter
public class ServiceVolunteerUpdateRequestDto {

    private String title;
    private AnimalType animalType;
    private LocalDate startDate;
    private LocalDate endDate;
    private String departureArea;
    private String arrivalArea;
    private String notice;

}
