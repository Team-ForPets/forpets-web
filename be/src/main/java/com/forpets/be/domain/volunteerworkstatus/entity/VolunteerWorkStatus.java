package com.forpets.be.domain.volunteerworkstatus.entity;

import com.forpets.be.domain.animal.entity.MyAnimal;
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
import jakarta.persistence.OneToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class VolunteerWorkStatus extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "service_status_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "my_animal_id", nullable = false)
    private MyAnimal myAnimal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requestor_user_id", nullable = false)
    private User requestor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "volunteer_user_id", nullable = false)
    private User volunteer;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VolunteerStatus status;

    @Builder
    public VolunteerWorkStatus(MyAnimal myAnimal, User requestor, User volunteer) {
        this.myAnimal = myAnimal;
        this.requestor = requestor;
        this.volunteer = volunteer;
        this.status = VolunteerStatus.IN_PROGRESS;
    }

    // 이동봉사 현황 상태 업데이트
    public VolunteerWorkStatus updateStatus(VolunteerStatus status) {
        this.status = status;

        return this;
    }
}
