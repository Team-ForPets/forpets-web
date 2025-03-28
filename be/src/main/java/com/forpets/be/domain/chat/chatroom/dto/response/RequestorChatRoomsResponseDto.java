package com.forpets.be.domain.chat.chatroom.dto.response;

import com.forpets.be.domain.chat.chatroom.entity.ChatRoom;
import com.forpets.be.domain.chat.chatroom.entity.RoomState;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Builder
// 내가 요청자로 참여한 채팅방이라서 봉사자(상대방) 및 봉사 등록글에 대한 정보를 응답
public class RequestorChatRoomsResponseDto {

    private final Long id;
    private final String imageUrl;
    private final String volunteerNickname;
    private final String departureArea;
    private final String arrivalArea;
    private final RoomState state;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    public static RequestorChatRoomsResponseDto from(ChatRoom chatRoom) {
        log.info("VolunteerChatRoomListResponseDto- chatRoom : {}", chatRoom);

        return RequestorChatRoomsResponseDto.builder()
            .id(chatRoom.getId())
            .imageUrl(chatRoom.getVolunteer().getImageUrl())
            .volunteerNickname(chatRoom.getVolunteer().getNickname())
            .departureArea(chatRoom.getServiceVolunteer().getDepartureArea())
            .arrivalArea(chatRoom.getServiceVolunteer().getArrivalArea())
            .state(chatRoom.getState())
            .createdAt(chatRoom.getCreatedAt())
            .updatedAt(chatRoom.getUpdatedAt())
            .build();
    }
}
