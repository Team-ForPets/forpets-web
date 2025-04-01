package com.forpets.be.domain.animal.dto.request;

import com.forpets.be.domain.animal.entity.MyAnimal;
import com.forpets.be.domain.servicevolunteer.entity.AnimalType;
import com.forpets.be.domain.user.entity.User;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.Range;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyAnimalCreateRequestDto {

    @NotNull(message = "이름은 필수 입력값입니다")
    @Size(min = 2, max = 10, message = "이름은 2자 이상 10자 이하여야 합니다")
    private String animalName;

    @NotNull(message = "동물유형은 필수 입력값입니다")
    @Enumerated(EnumType.STRING)
    private AnimalType animalType;

    @NotNull(message = "출발지는 필수 입력값입니다")
    private String departureArea;

    @NotNull(message = "도착지는 필수 입력값입니다")
    private String arrivalArea;

    @NotNull(message = "품종은 필수 입력값입니다")
    @Size(min = 2, max = 10, message = "품종은 2자 이상 10자 이하여야 합니다")
    private String breed;

    @Range(min = 0, max = 25)
    private Integer age;

    @Positive
    @Range(min = 0, max = 60)
    private Integer weight;

    @Length(min = 0, max = 255)
    private String notice;

    @Length(min = 0, max = 255)
    private String memo;

    @NotNull(message = "날짜는 필수 입력값입니다")
    private LocalDate selectedDate;

    @NotNull(message = "공개여부는 필수 입력값입니다")
    private Boolean isOpen;

    @NotNull(message = "삭제여부는 필수 입력값입니다")
    private Boolean isDelete;

    public MyAnimal toEntity(User user, MultipartFile file) {
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
            .originalFileName(file.getOriginalFilename())
            .isOpen(this.isOpen)
            .isDelete(this.isDelete)
            .user(user)
            .build();
    }
}
