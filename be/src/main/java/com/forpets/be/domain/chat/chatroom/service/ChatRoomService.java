package com.forpets.be.domain.chat.chatroom.service;

import com.forpets.be.domain.animal.entity.MyAnimal;
import com.forpets.be.domain.animal.repository.MyAnimalRepository;
import com.forpets.be.domain.chat.chatroom.dto.request.ChatRoomRequestDto;
import com.forpets.be.domain.chat.chatroom.dto.response.ChatRoomResponseDto;
import com.forpets.be.domain.chat.chatroom.dto.response.ChatRoomsListResponseDto;
import com.forpets.be.domain.chat.chatroom.dto.response.VolunteerChatRoomListResponseDto;
import com.forpets.be.domain.chat.chatroom.entity.ChatRoom;
import com.forpets.be.domain.chat.chatroom.repository.ChatRoomRepository;
import com.forpets.be.domain.servicevolunteer.entity.ServiceVolunteer;
import com.forpets.be.domain.servicevolunteer.repository.VolunteerRepository;
import com.forpets.be.domain.user.entity.User;
import com.forpets.be.domain.user.repository.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final MyAnimalRepository myAnimalRepository;
    private final VolunteerRepository volunteerRepository;
    private final UserRepository userRepository;

    // 채팅방 생성
    @Transactional
    public ChatRoomResponseDto createChatRoom(ChatRoomRequestDto requestDto, User user) {
        ServiceVolunteer serviceVolunteer = null;
        User requestor = null;
        User volunteer = null;

        MyAnimal myAnimal = myAnimalRepository.findById(requestDto.getMyAnimalId())
            .orElseThrow(() -> new IllegalArgumentException("해당 나의 아이 등록글이 존재하지 않습니다."));

        // 나의 아이 등록글에서 채팅이 시작된 경우
        if (requestDto.getServiceVolunteerId() == null) {
            log.info("ChatRoomService- myAnimal: {}", myAnimal.getUser());

            // 요청자는 나의 아이 등록글의 user_id를 통해 정보를 가져옴
            requestor = userRepository.findById(myAnimal.getUser().getId())
                .orElseThrow(() -> new IllegalArgumentException("요청자 정보를 찾을 수 없습니다."));

            // 봉사자는 로그인한 사용자
            volunteer = user;

            // 요청자와 봉사자가 동일한지 확인하고 예외 처리 (필요할 경우)
            if (volunteer.getId().equals(requestor.getId())) {
                throw new IllegalArgumentException("요청자와 봉사자는 동일할 수 없습니다.");
            }
        }

        // 봉사글에서 채팅이 시작된 경우
        if (requestDto.getServiceVolunteerId() != null) {
            serviceVolunteer = volunteerRepository.findById(
                    requestDto.getServiceVolunteerId())
                .orElseThrow(() -> new IllegalArgumentException("해당 봉사 등록글이 존재하지 않습니다."));

            log.info("ChatRoomService- serviceVolunteer: {}", serviceVolunteer.getUser());

            // 요청자는 로그인한 사용자
            requestor = user;

            // 봉사자는 봉사글의 user_id를 통해 정보를 가져옴
            volunteer = userRepository.findById(serviceVolunteer.getUser().getId())
                .orElseThrow(() -> new IllegalArgumentException("봉사자 정보를 찾을 수 없습니다."));

            // 요청자와 봉사자가 동일한지 확인하고 예외 처리
            if (requestor.getId().equals(volunteer.getId())) {
                throw new IllegalArgumentException("요청자와 봉사자는 동일할 수 없습니다.");
            }
        }

        // 해당 나의 아이 게시글 또는 봉사 등록글에서 생성한 채팅방이 이미 존재하는 경우에 대한 예외 처리 필요
        // 채팅방 중복 생성 방지
        if (chatRoomRepository.existsByRequestorAndVolunteer(requestor, volunteer)) {
            throw new IllegalStateException("이미 존재하는 채팅방입니다.");
        }

        ChatRoom chatRoom = ChatRoom.builder()
            .myAnimal(myAnimal)
            .serviceVolunteer(serviceVolunteer)
            .requestor(requestor)
            .volunteer(volunteer)
            .build();

        return ChatRoomResponseDto.from(chatRoomRepository.save(chatRoom));
    }

    // 내가 요청자로 속한 채팅방 전체 조회
    public ChatRoomsListResponseDto getRequestorChatRooms(Long requestorId) {
        List<VolunteerChatRoomListResponseDto> chatRooms = chatRoomRepository.findAllByRequestorId(
            requestorId).stream().map(VolunteerChatRoomListResponseDto::from).toList();

        Integer total = chatRooms.size();

        return ChatRoomsListResponseDto.from(chatRooms, total);
    }
}

