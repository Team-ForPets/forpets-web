package com.forpets.be.domain.chat.chatroom.dto.response;

import com.forpets.be.domain.chat.chatroom.entity.ChatRoom;
import com.forpets.be.domain.chat.chatroom.entity.RoomState;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChatRoomResponseDto {

    private final Long id;
    private final Long serviceVolunteerId;
    private final String requestorNickname;
    private final String volunteerNickname;
    private final RoomState state;
    private final LocalDateTime createdAt;

    public static ChatRoomResponseDto from(ChatRoom entity) {
        return ChatRoomResponseDto.builder()
            .id(entity.getId())
            .serviceVolunteerId(entity.getServiceVolunteer().getId())
            .requestorNickname(entity.getRequestor().getNickname())
            .volunteerNickname(entity.getVolunteer().getNickname())
            .state(entity.getState())
            .createdAt(entity.getCreatedAt())
            .build();
    }
}