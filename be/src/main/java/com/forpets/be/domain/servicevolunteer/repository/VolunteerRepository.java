package com.forpets.be.domain.servicevolunteer.repository;

import com.forpets.be.domain.servicevolunteer.entity.ServiceVolunteer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VolunteerRepository extends JpaRepository<ServiceVolunteer, String> {


}
