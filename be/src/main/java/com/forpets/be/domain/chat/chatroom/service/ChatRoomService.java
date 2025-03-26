package com.forpets.be.domain.chat.chatroom.service;

import com.forpets.be.domain.chat.chatroom.dto.request.ChatRoomRequestDto;
import com.forpets.be.domain.chat.chatroom.dto.response.ChatRoomResponseDto;
import com.forpets.be.domain.chat.chatroom.entity.ChatRoom;
import com.forpets.be.domain.chat.chatroom.repository.ChatRoomRepository;
import com.forpets.be.domain.servicevolunteer.entity.ServiceVolunteer;
import com.forpets.be.domain.servicevolunteer.repository.VolunteerRepository;
import com.forpets.be.domain.user.entity.User;
import com.forpets.be.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final VolunteerRepository volunteerRepository;
    private final UserRepository userRepository;

    @Transactional
    public ChatRoomResponseDto createChatRoom(ChatRoomRequestDto requestDto, User user) {
        User requestor = null;
        User volunteer = null;

        ServiceVolunteer serviceVolunteer = volunteerRepository.findById(
                requestDto.getServiceVolunteerId())
            .orElseThrow(() -> new IllegalArgumentException("해당 봉사 등록글이 존재하지 않습니다."));

        // Todo: 나의 아이 등록글에서 채팅이 시작된 경우 로직 구현 필요

        // 봉사글에서 채팅이 시작된 경우
        if (requestDto.getServiceVolunteerId() != null) {
            // 요청자는 로그인한 사용자
            requestor = user;

            // 봉사자는 봉사글의 user_id를 통해 정보를 가져옴
            volunteer = userRepository.findById(serviceVolunteer.getUser().getId())
                .orElseThrow(() -> new IllegalArgumentException("봉사자 정보를 찾을 수 없습니다."));

            // 요청자와 봉사자가 동일한지 확인하고 예외 처리 (필요할 경우)
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
            .serviceVolunteer(serviceVolunteer)
            .requestor(requestor)
            .volunteer(volunteer)
            .build();

        return ChatRoomResponseDto.from(chatRoomRepository.save(chatRoom));
    }
}

