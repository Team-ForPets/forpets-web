package com.forpets.be.domain.servicevolunteer.service;

import com.forpets.be.domain.servicevolunteer.dto.request.ServiceVolunteerRequestDto;
import com.forpets.be.domain.servicevolunteer.dto.response.ServiceVolunteerDetailResponseDto;
import com.forpets.be.domain.servicevolunteer.dto.response.ServiceVolunteerListResponseDto;
import com.forpets.be.domain.servicevolunteer.dto.response.ServiceVolunteerResponseDto;
import com.forpets.be.domain.servicevolunteer.entity.ServiceVolunteer;
import com.forpets.be.domain.servicevolunteer.repository.VolunteerRepository;
import com.forpets.be.domain.user.entity.User;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class VolunteerService {

    private final VolunteerRepository volunteerRepository;

    @Transactional
    public ServiceVolunteerResponseDto createVolunteer(ServiceVolunteerRequestDto requestDto,
        User user) {
        ServiceVolunteer volunteer = requestDto.toEntity();
        volunteer.addUser(user);

        return ServiceVolunteerResponseDto.from(volunteerRepository.save(volunteer));
    }

    public List<ServiceVolunteerListResponseDto> getAllVolunteers() {

        return volunteerRepository.findAll().stream()

            .map(volunteer -> {

// Fetch associated User

                User user = volunteer.getUser();

                return ServiceVolunteerListResponseDto.from(volunteer, user);

            })

            .toList();
    }

    public ServiceVolunteerDetailResponseDto getVolunteerById(Long id) {
        ServiceVolunteer volunteer = volunteerRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("해당 ID의 봉사자가 존재하지 않습니다."));
        return ServiceVolunteerDetailResponseDto.from(volunteer);
    }
}
