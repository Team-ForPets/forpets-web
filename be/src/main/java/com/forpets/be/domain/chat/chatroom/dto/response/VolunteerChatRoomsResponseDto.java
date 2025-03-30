package com.forpets.be.domain.chat.chatroom.dto.response;

import com.forpets.be.domain.chat.chatroom.entity.ChatRoom;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
// 내가 봉사자로 참여한 채팅방이라서 요청자(상대방) 및 나의 아이 등록글에 대한 정보를 응답
public class VolunteerChatRoomsResponseDto {

    private final Long id;
    private final String imageUrl;
    private final String requestorNickname;
    private final String departureArea;
    private final String arrivalArea;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    public static VolunteerChatRoomsResponseDto from(ChatRoom chatRoom) {
        return VolunteerChatRoomsResponseDto.builder()
            .id(chatRoom.getId())
            .imageUrl(chatRoom.getRequestor().getImageUrl())
            .requestorNickname(chatRoom.getRequestor().getNickname())
            .departureArea(chatRoom.getMyAnimal().getDepartureArea())
            .arrivalArea(chatRoom.getMyAnimal().getArrivalArea())
            .createdAt(chatRoom.getCreatedAt())
            .updatedAt(chatRoom.getUpdatedAt())
            .build();
    }
}
