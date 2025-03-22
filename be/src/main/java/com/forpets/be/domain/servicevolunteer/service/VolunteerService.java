package com.forpets.be.domain.servicevolunteer.service;

import com.forpets.be.domain.servicevolunteer.dto.request.ServiceVolunteerRequestDto;
import com.forpets.be.domain.servicevolunteer.dto.response.ServiceVolunteerResponseDto;
import com.forpets.be.domain.servicevolunteer.entity.ServiceVolunteer;
import com.forpets.be.domain.servicevolunteer.repository.VolunteerRepository;
import com.forpets.be.domain.user.entity.User;
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
    public ServiceVolunteerResponseDto serviceVolunteer(ServiceVolunteerRequestDto requestDto,
        User user) {

        ServiceVolunteer volunteer = requestDto.toEntity();
        volunteer.addUser(user);

        return ServiceVolunteerResponseDto.from(volunteerRepository.save(volunteer));
    }
}
