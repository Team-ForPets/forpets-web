package com.forpets.be.domain.volunteerwork.repository;

import com.forpets.be.domain.volunteerwork.entity.VolunteerWork;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VolunteerWorkRepository extends JpaRepository<VolunteerWork, Long> {

    List<VolunteerWork> findByUserId(Long id);

}
