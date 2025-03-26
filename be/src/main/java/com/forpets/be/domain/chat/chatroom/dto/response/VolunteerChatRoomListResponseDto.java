package com.forpets.be.domain.chat.chatroom.dto.response;

import com.forpets.be.domain.chat.chatroom.entity.ChatRoom;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Builder
public class VolunteerChatRoomListResponseDto {

    private final Long id;
    private final String imageUrl;
    private final String volunteerNickname;
    private final String departureArea;
    private final String arrivalArea;
    private final LocalDateTime createdAt;

    public static VolunteerChatRoomListResponseDto from(ChatRoom chatRoom) {
        log.info("VolunteerChatRoomListResponseDto- chatRoom : {}", chatRoom);

        return VolunteerChatRoomListResponseDto.builder()
            .id(chatRoom.getId())
            .imageUrl(chatRoom.getVolunteer().getImageUrl())
            .volunteerNickname(chatRoom.getVolunteer().getNickname())
            .departureArea(chatRoom.getServiceVolunteer().getDepartureArea())
            .arrivalArea(chatRoom.getServiceVolunteer().getArrivalArea())
            .createdAt(chatRoom.getCreatedAt())
            .build();
    }
}
