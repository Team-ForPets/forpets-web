package com.forpets.be.domain.chat.chatroom.dto.response;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
// 내가 요청자로 속한 채팅방 전체 조회 + 채팅방의 개수 응답
public class RequestorChatRoomsListResponseDto {

    private List<RequestorChatRoomsResponseDto> chatRooms;
    private Integer total;

    public static RequestorChatRoomsListResponseDto from(
        List<RequestorChatRoomsResponseDto> chatRooms, Integer total) {
        return RequestorChatRoomsListResponseDto.builder()
            .chatRooms(chatRooms)
            .total(total)
            .build();
    }
}
