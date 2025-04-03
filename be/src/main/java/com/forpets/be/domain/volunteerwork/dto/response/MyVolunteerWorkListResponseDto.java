package com.forpets.be.domain.volunteerwork.dto.response;

import com.forpets.be.domain.volunteerwork.entity.VolunteerWork;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MyVolunteerWorkListResponseDto {

    private final List<MyVolunteerWorkResponseDto> posts;
    private final Integer total;

    public static MyVolunteerWorkListResponseDto fromList(List<VolunteerWork> entites) {
        List<MyVolunteerWorkResponseDto> responseDtos = entites.stream()
            .map(entity -> MyVolunteerWorkResponseDto.from(entity))
            .toList();
        return new MyVolunteerWorkListResponseDto(responseDtos, entites.size());
    }
}
