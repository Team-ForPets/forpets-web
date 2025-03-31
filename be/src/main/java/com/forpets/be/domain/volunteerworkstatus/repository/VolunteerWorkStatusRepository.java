package com.forpets.be.domain.volunteerworkstatus.repository;

import com.forpets.be.domain.animal.entity.MyAnimal;
import com.forpets.be.domain.user.entity.User;
import com.forpets.be.domain.volunteerworkstatus.entity.VolunteerWorkStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VolunteerWorkStatusRepository extends JpaRepository<VolunteerWorkStatus, Long> {

    boolean existsByMyAnimalAndRequestorAndVolunteer(MyAnimal myAnimal, User requestor,
        User volunteer);
}
