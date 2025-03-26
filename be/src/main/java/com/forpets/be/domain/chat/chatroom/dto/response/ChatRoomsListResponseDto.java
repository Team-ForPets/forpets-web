package com.forpets.be.domain.chat.chatroom.dto.response;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChatRoomsListResponseDto {

    private List<VolunteerChatRoomListResponseDto> chatRooms;
    private Integer total;

    public static ChatRoomsListResponseDto from(
        List<VolunteerChatRoomListResponseDto> chatRooms, Integer total) {
        return ChatRoomsListResponseDto.builder()
            .chatRooms(chatRooms)
            .total(total)
            .build();
    }
}
