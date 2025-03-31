package com.forpets.be.domain.volunteerworkstatus.repository;

import com.forpets.be.domain.animal.entity.MyAnimal;
import com.forpets.be.domain.user.entity.User;
import com.forpets.be.domain.volunteerworkstatus.entity.VolunteerWorkStatus;
import com.forpets.be.domain.volunteerworkstatus.entity.WorkState;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VolunteerWorkStatusRepository extends JpaRepository<VolunteerWorkStatus, Long> {

    // 이미 존재하는 이동봉사 현황이 있는지 확인
    boolean existsByMyAnimalAndRequestorAndVolunteer(MyAnimal myAnimal, User requestor,
        User volunteer);

    // 상태에 대한 이동봉사 현황 조회
    List<VolunteerWorkStatus> findAllByState(WorkState state);
}
