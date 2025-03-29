package com.forpets.be.domain.animal.repository;

import com.forpets.be.domain.animal.entity.MyAnimal;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MyAnimalRepository extends JpaRepository<MyAnimal, Long> {

    List<MyAnimal> findByUserId(Long userID);

    @Query("SELECT a FROM MyAnimal a ORDER BY a.selectedDate DESC")
    List<MyAnimal> findAllOrderByCreatedAtDesc();
}
