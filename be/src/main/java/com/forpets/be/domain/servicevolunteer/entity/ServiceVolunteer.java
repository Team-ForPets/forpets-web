package com.forpets.be.domain.servicevolunteer.entity;

import com.forpets.be.domain.servicevolunteer.dto.request.ServiceVolunteerUpdateRequestDto;
import com.forpets.be.domain.user.entity.User;
import com.forpets.be.global.entity.BaseTimeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "service_volunteer")
@NoArgsConstructor
public class ServiceVolunteer extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "service_volunteer_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    @Column(name = "title", length = 50, nullable = false)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(name = "animal_type", nullable = false)
    private AnimalType animalType;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @Column(name = "departure_area", nullable = false)
    private String departureArea;

    @Column(name = "arrival_area", nullable = false)
    private String arrivalArea;

    @Column(name = "notice", nullable = true)
    private String notice;

    @Builder
    public ServiceVolunteer(User user, String title, AnimalType animalType, LocalDate startDate,
        LocalDate endDate, String departureArea, String arrivalArea, String notice) {
        this.user = user;
        this.title = title;
        this.animalType = animalType;
        this.startDate = startDate;
        this.endDate = endDate;
        this.departureArea = departureArea;
        this.arrivalArea = arrivalArea;
        this.notice = notice;
    }

    public void addUser(User user) {
        this.user = user;
    }

    public ServiceVolunteer update(ServiceVolunteerUpdateRequestDto requestDto) {

        this.title = requestDto.getTitle();
        this.animalType = requestDto.getAnimalType();
        this.startDate = requestDto.getStartDate();
        this.endDate = requestDto.getEndDate();
        this.departureArea = requestDto.getDepartureArea();
        this.arrivalArea = requestDto.getArrivalArea();
        this.notice = requestDto.getNotice();
        return this;
    }

}
