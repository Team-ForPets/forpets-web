package com.forpets.be.domain.animal.entity;

import com.forpets.be.domain.animal.dto.request.MyAnimalUpdateRequestDto;
import com.forpets.be.domain.servicevolunteer.entity.AnimalType;
import com.forpets.be.domain.user.entity.User;
import com.forpets.be.global.entity.BaseTimeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "my_animal")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MyAnimal extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "my_animal_id")
    private Long id;

    @Column(nullable = false)
    private String animalName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AnimalType animalType;

    @Column(nullable = false)
    private String departureArea;

    @Column(nullable = false)
    private String arrivalArea;

    @Column(nullable = false)
    private String breed;

    @Column(nullable = true)
    private Integer age;

    @Column(nullable = true)
    private Integer weight;

    @Column(nullable = true)
    private String notice;

    @Column(nullable = true)
    private String memo;

    @Column(nullable = false)
    private LocalDate selectedDate;

    // S3 객체의 접근 URL
    // AWS S3 버킷 객체의 URL
    @Column(nullable = true)
    private String imageUrl;

    // S3 객체의 키(식별자)
    // 버킷 내 객체를 구분하기 위해 필요하다.
    // 객체 삭제에 활용되는 필드
    @Column(nullable = true)
    private String s3Key;

    // 업로드 파일의 원본 파일명
    // 화면 출력용
    @Column(nullable = true)
    private String originalFileName;

    @Column(nullable = false)
    private Boolean isOpen;

    @Column(nullable = false)
    private Boolean isDelete;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    public MyAnimal(String animalName, AnimalType animalType, String departureArea,
        String arrivalArea,
        String breed, Integer age, Integer weight, String notice, String memo,
        LocalDate selectedDate,
        String imageUrl, String s3Key, String originalFileName, Boolean isOpen, Boolean isDelete,
        User user) {
        this.animalName = animalName;
        this.animalType = animalType;
        this.departureArea = departureArea;
        this.arrivalArea = arrivalArea;
        this.breed = breed;
        this.age = age;
        this.weight = weight;
        this.notice = notice;
        this.memo = memo;
        this.selectedDate = selectedDate;
        this.imageUrl = imageUrl;
        this.s3Key = s3Key;
        this.originalFileName = originalFileName;
        this.user = user;
        this.isOpen = isOpen;
        this.isDelete = isDelete;
    }

    public MyAnimal update(MyAnimalUpdateRequestDto updateRequestDto) {
        this.animalName = updateRequestDto.getAnimalName();
        this.animalType = updateRequestDto.getAnimalType();
        this.departureArea = updateRequestDto.getDepartureArea();
        this.arrivalArea = updateRequestDto.getArrivalArea();
        this.breed = updateRequestDto.getBreed();
        this.age = updateRequestDto.getAge();
        this.weight = updateRequestDto.getWeight();
        this.notice = updateRequestDto.getNotice();
        this.memo = updateRequestDto.getMemo();
        this.selectedDate = updateRequestDto.getSelectedDate();
        this.imageUrl = updateRequestDto.getImageUrl();
        this.s3Key = updateRequestDto.getS3Key();
        this.originalFileName = updateRequestDto.getOriginalFileName();
        this.isOpen = updateRequestDto.getIsOpen();

        return this;
    }
}
