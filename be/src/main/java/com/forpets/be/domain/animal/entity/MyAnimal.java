package com.forpets.be.domain.animal.entity;

import com.forpets.be.domain.servicevolunteer.entity.AnimalType;
import com.forpets.be.global.entity.BaseTimeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Date;
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

    @Column(nullable = false)
    private Enum<AnimalType> animaType;

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
    private Date selectedDate;


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

    @Builder
    public MyAnimal(String animalName, Boolean isDelete, Boolean isOpen, String originalFileName,
        String s3Key, String imageUrl, Date selectedDate, String memo, String notice,
        Integer weight,
        Integer age, String breed, Enum<AnimalType> animaType) {
        this.animalName = animalName;
        this.isDelete = isDelete;
        this.isOpen = isOpen;
        this.originalFileName = originalFileName;
        this.s3Key = s3Key;
        this.imageUrl = imageUrl;
        this.selectedDate = selectedDate;
        this.memo = memo;
        this.notice = notice;
        this.weight = weight;
        this.age = age;
        this.breed = breed;
        this.animaType = animaType;
    }
}
