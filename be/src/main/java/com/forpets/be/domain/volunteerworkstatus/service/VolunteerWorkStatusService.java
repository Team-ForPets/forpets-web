package com.forpets.be.domain.volunteerworkstatus.service;

import com.forpets.be.domain.animal.entity.MyAnimal;
import com.forpets.be.domain.animal.repository.MyAnimalRepository;
import com.forpets.be.domain.user.entity.User;
import com.forpets.be.domain.user.repository.UserRepository;
import com.forpets.be.domain.volunteerworkstatus.dto.request.VolunteerWorkStatusRequestDto;
import com.forpets.be.domain.volunteerworkstatus.dto.response.VolunteerWorkStatusListResponseDto;
import com.forpets.be.domain.volunteerworkstatus.dto.response.VolunteerWorkStatusResponseDto;
import com.forpets.be.domain.volunteerworkstatus.entity.VolunteerStatus;
import com.forpets.be.domain.volunteerworkstatus.entity.VolunteerWorkStatus;
import com.forpets.be.domain.volunteerworkstatus.repository.VolunteerWorkStatusRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class VolunteerWorkStatusService {

    private final VolunteerWorkStatusRepository volunteerWorkStatusRepository;
    private final MyAnimalRepository myAnimalRepository;
    private final UserRepository userRepository;

    // 이동봉사 현황 생성
    @Transactional
    public VolunteerWorkStatusResponseDto createServiceStatus(
        VolunteerWorkStatusRequestDto requestDto) {
        MyAnimal myAnimal = myAnimalRepository.findById(requestDto.getMyAnimalId())
            .orElseThrow(() -> new IllegalArgumentException("해당 나의 아이를 찾을 수 없습니다."));

        User requestor = userRepository.findById(requestDto.getRequestorId())
            .orElseThrow(() -> new IllegalArgumentException("해당 요청자(사용자)를 찾을 수 없습니다."));
        User volunteer = userRepository.findById(requestDto.getVolunteerId())
            .orElseThrow(() -> new IllegalArgumentException("해당 봉사자(사용자)를 찾을 수 없습니다."));

        // 나의 아이을 등록한 사용자가 요청을 보낸 사용자도 아니고 봉사자도 아닌 경우
        if (!(myAnimal.getUser().getId() == requestDto.getRequestorId()
            || myAnimal.getUser().getId() == requestDto.getVolunteerId())) {
            throw new IllegalArgumentException("나의 아이를 등록한 사용자와 요청자 또는 봉사자의 정보가 일치하지 않습니다.");
        }

        if (volunteerWorkStatusRepository.existsByMyAnimalAndRequestorAndVolunteer(myAnimal,
            requestor, volunteer)) {
            throw new IllegalArgumentException("해당 이동봉사 현황이 이미 존재합니다.");
        }

        VolunteerWorkStatus volunteerWorkStatus = VolunteerWorkStatus.builder()
            .myAnimal(myAnimal)
            .requestor(requestor)
            .volunteer(volunteer)
            .build();

        return VolunteerWorkStatusResponseDto.from(
            volunteerWorkStatusRepository.save(volunteerWorkStatus), myAnimal, requestor,
            volunteer);
    }

    // 이동봉사 현황 전체 조회
    public VolunteerWorkStatusListResponseDto getVolunteerWorkStatuses(String status) {
        List<VolunteerWorkStatus> volunteerWorkStatuses;

        if (status == null || status.equals("all")) {
            // 전체 이동봉사 현황 조회
            volunteerWorkStatuses = volunteerWorkStatusRepository.findAll();
        } else if (status.equals("in-progress")) {
            // 진행 중인 이동봉사 현황 조회
            volunteerWorkStatuses = volunteerWorkStatusRepository.findAllByState(
                VolunteerStatus.IN_PROGRESS);
        } else if (status.equals("completed")) {
            // 완료된 이동봉사 현황 조회
            volunteerWorkStatuses = volunteerWorkStatusRepository.findAllByState(
                VolunteerStatus.COMPLETED);
        } else {
            throw new IllegalArgumentException("현황에 대한 상태는 all, in-progress, completed만 입력 가능합니다.");
        }

        List<VolunteerWorkStatusResponseDto> volunteerWorkStatusResponseDtos = volunteerWorkStatuses.stream()
            .map(volunteerWorkStatus -> VolunteerWorkStatusResponseDto.from(volunteerWorkStatus,
                volunteerWorkStatus.getMyAnimal(), volunteerWorkStatus.getRequestor(),
                volunteerWorkStatus.getVolunteer()))
            .toList();

        Integer total = volunteerWorkStatusResponseDtos.size();

        return VolunteerWorkStatusListResponseDto.from(volunteerWorkStatusResponseDtos, total);
    }

    // 나의 이동봉사 현황 조회
    public VolunteerWorkStatusListResponseDto getMyVolunteerWorkStatus(User user) {
        // 로그인한 사용자가 요청자 또는 봉사자로 참여했던 이동봉사 현황 조회
        List<VolunteerWorkStatus> volunteerWorkStatuses = volunteerWorkStatusRepository.findByRequestorOrVolunteer(
            user.getId());

        // 로그인한 사용자가 요청자 또는 봉사자로 참여했던 이동봉사 현황이 존재하지 않는 경우를 검증
        if (volunteerWorkStatuses.isEmpty()) {
            throw new IllegalArgumentException("해당 사용자가 요청자 또는 봉사자로 참여했던 이동봉사 현황을 찾을 수 없습니다.");
        }

        List<VolunteerWorkStatusResponseDto> volunteerWorkStatusResponseDtos = volunteerWorkStatuses.stream()
            .map(volunteerWorkStatus -> VolunteerWorkStatusResponseDto.from(volunteerWorkStatus,
                volunteerWorkStatus.getMyAnimal(), volunteerWorkStatus.getRequestor(),
                volunteerWorkStatus.getVolunteer()))
            .toList();

        Integer total = volunteerWorkStatusResponseDtos.size();

        return VolunteerWorkStatusListResponseDto.from(volunteerWorkStatusResponseDtos, total);
    }

    // 이동봉사 현황 삭제
    @Transactional
    public void deleteVolunteerWorkStatus(Long volunteerWorkStatusId) {
        VolunteerWorkStatus volunteerWorkStatus = volunteerWorkStatusRepository.findById(
                volunteerWorkStatusId)
            .orElseThrow(() -> new IllegalArgumentException("해당 이동봉사 현황을 찾을 수 없습니다."));
        
        volunteerWorkStatusRepository.delete(volunteerWorkStatus);
    }
}
