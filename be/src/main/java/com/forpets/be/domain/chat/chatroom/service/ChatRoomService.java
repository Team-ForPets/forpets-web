package com.forpets.be.domain.chat.chatroom.service;

import com.forpets.be.domain.animal.dto.response.MyAnimalReadResponseDto;
import com.forpets.be.domain.animal.entity.MyAnimal;
import com.forpets.be.domain.animal.repository.MyAnimalRepository;
import com.forpets.be.domain.chat.chatmessage.dto.response.ChatMessageResponseDto;
import com.forpets.be.domain.chat.chatmessage.repository.ChatMessageRepository;
import com.forpets.be.domain.chat.chatroom.dto.request.ChatRoomRequestDto;
import com.forpets.be.domain.chat.chatroom.dto.request.ChatRoomUpdateRequestRecord;
import com.forpets.be.domain.chat.chatroom.dto.response.ChatRoomDetailResponseDto;
import com.forpets.be.domain.chat.chatroom.dto.response.ChatRoomResponseDto;
import com.forpets.be.domain.chat.chatroom.dto.response.RequestorChatRoomsListResponseDto;
import com.forpets.be.domain.chat.chatroom.dto.response.RequestorChatRoomsResponseDto;
import com.forpets.be.domain.chat.chatroom.dto.response.VolunteerChatRoomsListResponseDto;
import com.forpets.be.domain.chat.chatroom.dto.response.VolunteerChatRoomsResponseDto;
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
    private final ChatMessageRepository chatMessageRepository;

    // 채팅방 생성
    @Transactional
    public ChatRoomResponseDto createChatRoom(ChatRoomRequestDto requestDto, User user) {
        ServiceVolunteer serviceVolunteer = null;
        User requestor = null;
        User volunteer = null;

        MyAnimal myAnimal = myAnimalRepository.findById(requestDto.getMyAnimalId())
            .orElseThrow(() -> new IllegalArgumentException("해당 나의 아이 등록글이 존재하지 않습니다."));

        if (requestDto.getServiceVolunteerId() == null) {
            // 나의 아이 등록글에서 채팅이 시작된 경우

            log.info("ChatRoomService- myAnimal: {}", myAnimal.getUser());

            // 요청자는 나의 아이 등록글의 user_id를 통해 정보를 가져옴
            requestor = userRepository.findById(myAnimal.getUser().getId())
                .orElseThrow(() -> new IllegalArgumentException("요청자 정보를 찾을 수 없습니다."));

            // 봉사자는 로그인한 사용자
            volunteer = user;

            // 요청자와 봉사자가 동일한지 확인하고 예외 처리
            if (volunteer.getId().equals(requestor.getId())) {
                throw new IllegalArgumentException("요청자와 봉사자는 동일할 수 없습니다.");
            }
        } else {
            // 봉사글에서 채팅이 시작된 경우

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

        // 나의 아이 등록글과 봉사 등록글 id를 확인하여 특정 게시글에서 시작된 채팅방이 이미 존재하는지 확인
        if (chatRoomRepository.existsRoomByRequestorAndVolunteerAndPost(requestor, volunteer,
            requestDto.getMyAnimalId(), requestDto.getServiceVolunteerId())) {
            throw new IllegalStateException("이미 해당 게시글로 생성된 채팅방이 존재합니다.");
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
    public RequestorChatRoomsListResponseDto getRequestorChatRooms(Long requestorId) {
        List<RequestorChatRoomsResponseDto> chatRooms = chatRoomRepository.findAllByRequestorId(
            requestorId).stream().map(RequestorChatRoomsResponseDto::from).toList();

        Integer total = chatRooms.size();

        return RequestorChatRoomsListResponseDto.from(chatRooms, total);
    }

    // 내가 봉사자로 속한 채팅방 전체 조회
    public VolunteerChatRoomsListResponseDto getVolunteerChatRooms(Long volunteerId) {
        List<VolunteerChatRoomsResponseDto> chatRooms = chatRoomRepository.findAllByVolunteerId(
            volunteerId).stream().map(VolunteerChatRoomsResponseDto::from).toList();

        Integer total = chatRooms.size();

        return VolunteerChatRoomsListResponseDto.from(chatRooms, total);
    }

    // 채팅방 상세 조회
    public ChatRoomDetailResponseDto getChatRoomById(Long chatRoomId) {
        // 채팅방 정보 로드
        ChatRoom chatRoom = chatRoomRepository.findChatRoomWithDetails(chatRoomId)
            .orElseThrow(() -> new IllegalArgumentException("채팅방을 찾을 수 없습니다."));

        // 닉네임 결정
        // 봉사 등록글이 null => 나의 아이 등록글을 통해 시작된 채팅인 경우 => 요청자 : 나의 아이 등록글 작성자(상대방), 봉사자 : 로그인한 사용자(나) 처리
        // 봉사 등록글이 not null => 봉사 등록글을 통해 시작된 채팅인 경우 => 요청자 : 로그인한 사용자(나), 봉사자 : 봉사 등록글 작성자(상대방) 처리
        String nickname = (chatRoom.getServiceVolunteer() == null)
            ? chatRoom.getRequestor().getNickname()
            : chatRoom.getVolunteer().getNickname();

        // 출발지/도착지 결정
        // 봉사 등록글이 null => 나의 아이 등록글을 통해 시작된 채팅인 경우 => 출발 요청 지역, 도착 요청 지역 처리
        // 봉사 등록글이 not null => 봉사 등록글을 통해 시작된 채팅인 경우 => 출발 가능 지역, 도착 가능 지역 처리
        String departureArea = (chatRoom.getServiceVolunteer() == null)
            ? chatRoom.getMyAnimal().getDepartureArea()
            : chatRoom.getServiceVolunteer().getDepartureArea();

        String arrivalArea = (chatRoom.getServiceVolunteer() == null)
            ? chatRoom.getMyAnimal().getArrivalArea()
            : chatRoom.getServiceVolunteer().getArrivalArea();

        // 나의 아이 등록글의 정보 조회
        MyAnimalReadResponseDto responseDto = MyAnimalReadResponseDto.from(chatRoom.getMyAnimal());

        // 해당 채팅방의 채팅 메시지 내역 조회
        List<ChatMessageResponseDto> chatMessages = chatMessageRepository.findByChatRoomId(
                chatRoomId).stream()
            .map(ChatMessageResponseDto::from)
            .toList();

        return ChatRoomDetailResponseDto.builder()
            .id(chatRoomId)
            .nickname(nickname)
            .departureArea(departureArea)
            .arrivalArea(arrivalArea)
            .myAnimal(responseDto)
            .state(chatRoom.getState())
            .createdAt(chatRoom.getCreatedAt())
            .updatedAt(chatRoom.getUpdatedAt())
            .chatMessages(chatMessages)
            .build();
    }

    // 채팅방 수정
    @Transactional
    public ChatRoomResponseDto updateChatRoom(Long chatRoomId,
        ChatRoomUpdateRequestRecord requestRecord, User user) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
            .orElseThrow(() -> new IllegalArgumentException("해당 채팅방을 찾을 수 없습니다."));

        // 채팅방에 존재하는 참여자(요청자 또는 봉사자)만 채팅방 상태를 수정할 수 있도록 검증
        if (!chatRoomRepository.existsUserByRequestorAndVolunteer(chatRoomId, user.getId())) {
            throw new IllegalArgumentException("해당 채팅방의 참여자만 방 상태 수정이 가능합니다.");
        }

        // 약속 잡기를 통한 매칭 확정, 약속 취소를 통한 매칭 취소, 이동 완료를 통한 매칭 종료 상태를 업데이트
        chatRoom.updateState(requestRecord.state());

        return ChatRoomResponseDto.from(chatRoom);
    }

    // 채팅방 삭제
    @Transactional
    public void deleteChatRoom(Long chatRoomId, User user) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
            .orElseThrow(() -> new IllegalArgumentException("해당 채팅방을 찾을 수 없습니다."));

        if (chatRoom.getRequestor().getId().equals(user.getId())) {
            // 채팅방을 나가는 참여자가 이동봉사 요청자인경우, 요청자 퇴장 처리
            chatRoom.setIsRequestorLeft(true);
        } else if (chatRoom.getVolunteer().getId().equals(user.getId())) {
            // 채팅방을 나가는 참여자가 봉사자인 경우, 봉사자 퇴장 처리
            chatRoom.setIsVolunteerLeft(true);
        } else {
            throw new IllegalArgumentException("채팅방 참여자가 아닙니다.");
        }

        // 채팅방에서 참여자가 모두 나갔을 경우 삭제되도록 로직 추가
        if (chatRoom.getIsRequestorLeft() && chatRoom.getIsVolunteerLeft()) {
            chatRoomRepository.delete(chatRoom);
        }
    }
}
