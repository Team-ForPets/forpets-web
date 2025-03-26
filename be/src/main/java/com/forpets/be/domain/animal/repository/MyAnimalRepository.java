package com.forpets.be.domain.animal.repository;

import com.forpets.be.domain.animal.entity.MyAnimal;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MyAnimalRepository extends JpaRepository<MyAnimal, Long> {

    List<MyAnimal> findByUserId(Long userID);
}
