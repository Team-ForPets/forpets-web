package com.forpets.be.domain.servicevolunteer.repository;

import com.forpets.be.domain.servicevolunteer.entity.VolunteerWork;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VolunteerRepository extends JpaRepository<VolunteerWork, Long> {

}
