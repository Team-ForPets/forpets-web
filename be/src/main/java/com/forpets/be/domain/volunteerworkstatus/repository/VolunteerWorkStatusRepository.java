package com.forpets.be.domain.volunteerworkstatus.repository;

import com.forpets.be.domain.animal.entity.MyAnimal;
import com.forpets.be.domain.user.entity.User;
import com.forpets.be.domain.volunteerworkstatus.entity.VolunteerStatus;
import com.forpets.be.domain.volunteerworkstatus.entity.VolunteerWorkStatus;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VolunteerWorkStatusRepository extends JpaRepository<VolunteerWorkStatus, Long> {

    // 이미 존재하는 이동봉사 현황이 있는지 확인
    boolean existsByMyAnimalAndRequestorAndVolunteer(MyAnimal myAnimal, User requestor,
        User volunteer);

    // 상태에 대한 이동봉사 현황 조회
    List<VolunteerWorkStatus> findAllByStatus(VolunteerStatus status);

    // 로그인한 사용자가 요청자 또는 봉사자로 참여했던 이동봉사 현황 조회
    @Query("SELECT v FROM VolunteerWorkStatus v "
        + "WHERE v.requestor.id = :userId OR v.volunteer.id = :userId")
    List<VolunteerWorkStatus> findByRequestorOrVolunteer(@Param("userId") Long userId);
}
