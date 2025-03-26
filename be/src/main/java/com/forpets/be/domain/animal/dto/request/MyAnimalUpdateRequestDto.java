package com.forpets.be.domain.animal.dto.request;

import com.forpets.be.domain.animal.entity.MyAnimal;
import com.forpets.be.domain.servicevolunteer.entity.AnimalType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.Range;

@Getter
public class MyAnimalUpdateRequestDto {

    @Size(min = 2, max = 10, message = "이름은 2자 이상 10자 이하여야 합니다")
    private String animalName;

    @Enumerated(EnumType.STRING)
    private AnimalType animalType;

    private String departureArea;

    private String arrivalArea;

    @Size(min = 2, max = 10, message = "품종은 2자 이상 10자 이하여야 합니다")
    private String breed;

    @Positive
    @Range(min = 0, max = 25)
    private Integer age;

    @Positive
    @Range(min = 0, max = 60)
    private Integer weight;

    @Length(min = 1, max = 255)
    private String notice;

    @Length(min = 1, max = 255)
    private String memo;

    private LocalDate selectedDate;

    @Length(min = 1, max = 255)
    private String imageUrl;

    @Length(min = 1, max = 255)
    private String s3Key;

    @Length(min = 1, max = 255)
    private String originalFileName;

    private Boolean isOpen;


    public MyAnimal toEntity() {
        return MyAnimal.builder()
            .animalName(this.animalName)
            .animalType(this.animalType)
            .departureArea(this.departureArea)
            .arrivalArea(this.arrivalArea)
            .breed(this.breed)
            .age(this.age)
            .weight(this.weight)
            .notice(this.notice)
            .memo(this.memo)
            .selectedDate(this.selectedDate)
            .imageUrl(this.imageUrl)
            .s3Key(this.s3Key)
            .originalFileName(this.originalFileName)
            .isOpen(this.isOpen)
            .build();
    }
}
