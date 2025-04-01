package com.forpets.be.domain.animal.dto.request;

import com.forpets.be.domain.servicevolunteer.entity.AnimalType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.Range;

@Getter
public class MyAnimalUpdateRequestDto {

    @Size(min = 1, max = 10, message = "이름은 1자 이상 10자 이하여야 합니다")
    private String animalName;

    @Enumerated(EnumType.STRING)
    private AnimalType animalType;

    private String departureArea;

    private String arrivalArea;

    @Size(min = 1, max = 10, message = "품종은 1자 이상 10자 이하여야 합니다")
    private String breed;

    @Range(min = 0, max = 25)
    private Integer age;

    @Range(min = 0, max = 60)
    private Integer weight;

    @Length(min = 1, max = 255)
    private String notice;

    @Length(min = 1, max = 255)
    private String memo;

    @NotNull(message = "날짜는 필수 입력값입니다")
    private LocalDate selectedDate;

    @NotNull
    private Boolean isOpen;
}
