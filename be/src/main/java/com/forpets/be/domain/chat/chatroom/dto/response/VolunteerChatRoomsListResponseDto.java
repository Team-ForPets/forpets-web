package com.forpets.be.domain.chat.chatroom.dto.response;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
// 내가 봉사자로 속한 채팅방 전체 조회 + 채팅방의 개수 응답
public class VolunteerChatRoomsListResponseDto {

    private final List<VolunteerChatRoomsResponseDto> chatRooms;
    private final Integer total;

    public static VolunteerChatRoomsListResponseDto from(
        List<VolunteerChatRoomsResponseDto> chatRooms,
        Integer total) {
        return VolunteerChatRoomsListResponseDto.builder()
            .chatRooms(chatRooms)
            .total(total)
            .build();
    }
}
