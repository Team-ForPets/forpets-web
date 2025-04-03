package com.forpets.be.domain.animal.service;

import com.forpets.be.domain.animal.dto.request.MyAnimalCreateRequestDto;
import com.forpets.be.domain.animal.dto.request.MyAnimalUpdateRequestDto;
import com.forpets.be.domain.animal.dto.response.AnimalsResponseDto;
import com.forpets.be.domain.animal.dto.response.MyAnimalResponseDto;
import com.forpets.be.domain.animal.entity.MyAnimal;
import com.forpets.be.domain.animal.repository.MyAnimalRepository;
import com.forpets.be.domain.user.entity.User;
import com.forpets.be.global.aws.S3Service;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MyAnimalService {

    private final MyAnimalRepository myAnimalRepository;
    private final S3Service s3Service;

    @Transactional
    public MyAnimalResponseDto createMyAnimal(MyAnimalCreateRequestDto createRequestDto,
        User user,
        MultipartFile file) {
        // S3에 파일을 업로드하고 접근 가능한 URL과 객체 키를 반환받음
        Map<String, String> uploadResult = s3Service.uploadFile(file);

        String imageUrl = uploadResult.get("imageUrl");
        String s3Key = uploadResult.get("s3Key");
        MyAnimal myAnimal = createRequestDto.toEntity(user, file);
        myAnimal.setImageUrl(imageUrl);
        myAnimal.setS3Key(s3Key);

        MyAnimalResponseDto m = MyAnimalResponseDto.from(myAnimalRepository.save(myAnimal));

        System.out.println(m);
        return m;
    }

    public AnimalsResponseDto getAnimals() {
        List<MyAnimalResponseDto> animals = myAnimalRepository.findAllOrderByCreatedAtDesc()
            .stream()
            .map(MyAnimalResponseDto::from).toList();
        Integer total = animals.size();

        return AnimalsResponseDto.from(animals, total);
    }

    public MyAnimalResponseDto getAnimalDetail(Long myAnimalId) {
        MyAnimal savedAnimal = myAnimalRepository.findById(myAnimalId)
            .orElseThrow(() -> new IllegalArgumentException("해당하는 등록된 아이가 없습니다."));

        return MyAnimalResponseDto.from(savedAnimal);
    }

    public AnimalsResponseDto getMyAnimals(Long userId) {
        List<MyAnimalResponseDto> myAnimals = myAnimalRepository.findByUserId(userId).stream()
            .map(MyAnimalResponseDto::from).toList();
        Integer total = myAnimals.size();

        return AnimalsResponseDto.from(myAnimals, total);
    }

    @Transactional
    public MyAnimalResponseDto updateMyAnimal(Long myAnimalId,
        MyAnimalUpdateRequestDto updateRequestDto,
        MultipartFile file
    ) {
        String imageUrl = null;
        String s3Key = null;
        MyAnimal myAnimal = myAnimalRepository.findById(myAnimalId).orElseThrow(
            IllegalArgumentException::new);

        if (file != null) {
            Map<String, String> uploadResult = s3Service.uploadFile(file);

            imageUrl = uploadResult.get("imageUrl");
            s3Key = uploadResult.get("s3Key");
            myAnimal.update(updateRequestDto, file, null);
            myAnimal.setImageUrl(imageUrl);
            myAnimal.setS3Key(s3Key);

            s3Service.deleteFile(updateRequestDto.getS3Key());
        } else {
            myAnimal.update(updateRequestDto, null, myAnimal.getOriginalFileName());
        }

        return MyAnimalResponseDto.from(myAnimal);
    }

    @Transactional
    public void deleteMyAnimal(Long myAnimalId) {
        myAnimalRepository.deleteById(myAnimalId);
    }
}
