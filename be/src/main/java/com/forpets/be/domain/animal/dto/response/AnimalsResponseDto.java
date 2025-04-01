package com.forpets.be.domain.animal.dto.response;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AnimalsResponseDto {

    private List<MyAnimalResponseDto> animals;
    private Integer total;

    public static AnimalsResponseDto from(List<MyAnimalResponseDto> animals, Integer total) {
        return AnimalsResponseDto.builder()
            .animals(animals)
            .total(total)
            .build();
    }
}
