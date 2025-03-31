package com.forpets.be.domain.servicevolunteer.service;

import com.forpets.be.domain.servicevolunteer.dto.request.ServiceVolunteerRequestDto;
import com.forpets.be.domain.servicevolunteer.dto.request.ServiceVolunteerUpdateRequestDto;
import com.forpets.be.domain.servicevolunteer.dto.response.ServiceVolunteerDetailResponseDto;
import com.forpets.be.domain.servicevolunteer.dto.response.ServiceVolunteerListResponseDto;
import com.forpets.be.domain.servicevolunteer.dto.response.ServiceVolunteerResponseDto;
import com.forpets.be.domain.servicevolunteer.entity.VolunteerWork;
import com.forpets.be.domain.servicevolunteer.repository.VolunteerRepository;
import com.forpets.be.domain.user.entity.User;
import com.forpets.be.global.exeption.ResourceNotFoundException;
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
        VolunteerWork volunteer = requestDto.toEntity();
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
        VolunteerWork volunteer = volunteerRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("해당 ID의 봉사자가 존재하지 않습니다."));
        return ServiceVolunteerDetailResponseDto.from(volunteer);
    }

    @Transactional
    public ServiceVolunteerResponseDto updateVolunteer(Long id,
        ServiceVolunteerUpdateRequestDto requestDto) {

        VolunteerWork volunteer = volunteerRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("해당 ID의 봉사자가 존재하지 않습니다."));
        volunteer.update(requestDto);
        return ServiceVolunteerResponseDto.from(volunteer);
    }

    @Transactional
    public void deleteVolunteer(Long id) {
        VolunteerWork volunteerWork = volunteerRepository.findById(id)
            .orElseThrow(
                () -> new ResourceNotFoundException("VolunteerWork not found with ID: " + id));
        volunteerRepository.delete(volunteerWork);
    }
}
