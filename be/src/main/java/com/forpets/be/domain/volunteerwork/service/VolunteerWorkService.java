package com.forpets.be.domain.volunteerwork.service;

import com.forpets.be.domain.user.entity.User;
import com.forpets.be.domain.volunteerwork.dto.request.VolunteerWokrUpdateRequestDto;
import com.forpets.be.domain.volunteerwork.dto.request.VolunteerWorkRequestDto;
import com.forpets.be.domain.volunteerwork.dto.response.VolunteerWorkDetailResponseDto;
import com.forpets.be.domain.volunteerwork.dto.response.VolunteerWorkListResponseDto;
import com.forpets.be.domain.volunteerwork.dto.response.VolunteerWorkResponseDto;
import com.forpets.be.domain.volunteerwork.entity.VolunteerWork;
import com.forpets.be.domain.volunteerwork.repository.VolunteerWorkRepository;
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
public class VolunteerWorkService {

    private final VolunteerWorkRepository volunteerWorkRepository;

    @Transactional
    public VolunteerWorkResponseDto createVolunteer(VolunteerWorkRequestDto requestDto,
        User user) {
        VolunteerWork volunteer = requestDto.toEntity();
        volunteer.addUser(user);

        return VolunteerWorkResponseDto.from(volunteerWorkRepository.save(volunteer));
    }

    public List<VolunteerWorkListResponseDto> getAllVolunteers() {

        return volunteerWorkRepository.findAll().stream()

            .map(volunteer -> {

// Fetch associated User

                User user = volunteer.getUser();

                return VolunteerWorkListResponseDto.from(volunteer, user);

            })

            .toList();
    }

    public VolunteerWorkDetailResponseDto getVolunteerById(Long id) {
        VolunteerWork volunteer = volunteerWorkRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("해당 ID의 봉사자가 존재하지 않습니다."));
        return VolunteerWorkDetailResponseDto.from(volunteer);
    }

    @Transactional
    public VolunteerWorkResponseDto updateVolunteer(Long id,
        VolunteerWokrUpdateRequestDto requestDto) {

        VolunteerWork volunteer = volunteerWorkRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("해당 ID의 봉사자가 존재하지 않습니다."));
        volunteer.update(requestDto);
        return VolunteerWorkResponseDto.from(volunteer);
    }

    @Transactional
    public void deleteVolunteer(Long id) {
        VolunteerWork volunteerWork = volunteerWorkRepository.findById(id)
            .orElseThrow(
                () -> new ResourceNotFoundException("VolunteerWork not found with ID: " + id));
        volunteerWorkRepository.delete(volunteerWork);
    }
}
