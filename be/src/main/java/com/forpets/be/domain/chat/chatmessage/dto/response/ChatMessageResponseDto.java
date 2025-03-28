package com.forpets.be.domain.chat.chatmessage.dto.response;

import com.forpets.be.domain.chat.chatmessage.entity.ChatMessage;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChatMessageResponseDto {

    private Long id;
    private Long chatRoomId;
    private Long senderId;
    private String content;

    public static ChatMessageResponseDto from(ChatMessage chatMessage) {
        return ChatMessageResponseDto.builder()
            .id(chatMessage.getId())
            .chatRoomId(chatMessage.getChatRoom().getId())
            .senderId(chatMessage.getSenderId())
            .content(chatMessage.getContent())
            .build();
    }
}
