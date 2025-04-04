package com.forpets.be.domain.chat.chatroom.dto.response;

import com.forpets.be.domain.chat.chatroom.entity.ChatRoom;
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
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    public static RequestorChatRoomsResponseDto from(ChatRoom chatRoom) {
        log.info("RequestorChatRoomsResponseDto - chatRoom: {}", chatRoom);

        String departureArea = null;
        String arrivalArea = null;

        if (chatRoom.getVolunteerWork() != null) {
            departureArea = chatRoom.getVolunteerWork().getDepartureArea();
            arrivalArea = chatRoom.getVolunteerWork().getArrivalArea();
        } else {
            log.warn("ChatRoom(id={}) has no VolunteerWork set!", chatRoom.getId());
        }

        return RequestorChatRoomsResponseDto.builder()
                .id(chatRoom.getId())
                .imageUrl(chatRoom.getVolunteer().getImageUrl())
                .volunteerNickname(chatRoom.getVolunteer().getNickname())
                .departureArea(departureArea)
                .arrivalArea(arrivalArea)
                .createdAt(chatRoom.getCreatedAt())
                .updatedAt(chatRoom.getUpdatedAt())
                .build();
    }

}
