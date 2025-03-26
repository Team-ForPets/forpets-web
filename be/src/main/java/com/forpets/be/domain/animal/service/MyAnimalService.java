package com.forpets.be.domain.animal.service;

import com.forpets.be.domain.animal.dto.request.MyAnimalCreateRequestDto;
import com.forpets.be.domain.animal.dto.response.AnimalsResponseDto;
import com.forpets.be.domain.animal.dto.response.MyAnimalReadResponseDto;
import com.forpets.be.domain.animal.repository.MyAnimalRepository;
import com.forpets.be.domain.user.entity.User;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MyAnimalService {

    private final MyAnimalRepository myAnimalRepository;

    @Transactional
    public void createMyAnimal(MyAnimalCreateRequestDto createRequestDto, User user) {
        myAnimalRepository.save(createRequestDto.toEntity(user));
    }

//    public List<MyAnimalReadResponseDto> getAnimals() {
//        return myAnimalRepository.findAll().stream().map(MyAnimalReadResponseDto::from).toList();
//    }

    public AnimalsResponseDto getAnimals() {
        List<MyAnimalReadResponseDto> animals = myAnimalRepository.findAll().stream()
            .map(MyAnimalReadResponseDto::from).toList();
        Integer total = animals.size();

        return AnimalsResponseDto.from(animals, total);
    }
}
