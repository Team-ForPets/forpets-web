package com.forpets.be.domain.animal.service;

import com.forpets.be.domain.animal.dto.request.MyAnimalCreateRequestDto;
import com.forpets.be.domain.animal.dto.request.MyAnimalUpdateRequestDto;
import com.forpets.be.domain.animal.dto.response.AnimalsResponseDto;
import com.forpets.be.domain.animal.dto.response.MyAnimalReadResponseDto;
import com.forpets.be.domain.animal.entity.MyAnimal;
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

    public AnimalsResponseDto getAnimals() {
        List<MyAnimalReadResponseDto> animals = myAnimalRepository.findAll().stream()
            .map(MyAnimalReadResponseDto::from).toList();
        Integer total = animals.size();

        return AnimalsResponseDto.from(animals, total);
    }

    public MyAnimalReadResponseDto getAnimalDetail(Long myAnimalId) {
        MyAnimal savedAnimal = myAnimalRepository.findById(myAnimalId)
            .orElseThrow(() -> new IllegalArgumentException("해당하는 등록된 아이가 없습니다."));

        return MyAnimalReadResponseDto.from(savedAnimal);
    }

    public AnimalsResponseDto getMyAnimals(Long userId) {
        List<MyAnimalReadResponseDto> myAnimals = myAnimalRepository.findByUserId(userId).stream()
            .map(MyAnimalReadResponseDto::from).toList();
        Integer total = myAnimals.size();

        return AnimalsResponseDto.from(myAnimals, total);
    }

    @Transactional
    public MyAnimalReadResponseDto updateMyAnimal(Long myAnimalId,
        MyAnimalUpdateRequestDto updateRequestDto) {
        MyAnimal myAnimal = myAnimalRepository.findById(myAnimalId).orElseThrow(
            IllegalArgumentException::new);

        myAnimal.update(updateRequestDto);

        return MyAnimalReadResponseDto.from(myAnimal);
    }

    @Transactional
    public void deleteMyAnimal(Long myAnimalId) {
        myAnimalRepository.deleteById(myAnimalId);
    }
}
