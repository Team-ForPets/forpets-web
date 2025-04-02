package com.forpets.be.domain.animal.dto.response;

import com.forpets.be.domain.animal.entity.MyAnimal;
import com.forpets.be.domain.volunteerwork.entity.AnimalType;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.time.LocalDate;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MyAnimalResponseDto {

    private Long id;
    private String animalName;
    @Enumerated(EnumType.STRING)
    private AnimalType animalType;
    private String departureArea;
    private String arrivalArea;
    private String breed;
    private Integer age;
    private Integer weight;
    private String notice;
    private String memo;
    private LocalDate selectedDate;
    private String imageUrl;
    private String originalFileName;

    public static MyAnimalResponseDto from(MyAnimal myAnimal) {
        return MyAnimalResponseDto.builder()
            .id(myAnimal.getId())
            .animalName(myAnimal.getAnimalName())
            .animalType(myAnimal.getAnimalType())
            .departureArea(myAnimal.getDepartureArea())
            .arrivalArea(myAnimal.getArrivalArea())
            .breed(myAnimal.getBreed())
            .age(myAnimal.getAge())
            .weight(myAnimal.getWeight())
            .notice(myAnimal.getNotice())
            .memo(myAnimal.getMemo())
            .selectedDate(myAnimal.getSelectedDate())
            .imageUrl(myAnimal.getImageUrl())
            .originalFileName(myAnimal.getOriginalFileName())
            .build();
    }
}
