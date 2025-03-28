package com.forpets.be.domain.chat.chatmessage.dto.response;

import com.forpets.be.domain.chat.chatmessage.entity.ChatMessage;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChatMessageResponseDto {

    private Long id;
    private Long chatRoomId;
    private Long senderId;
    private String content;
    private LocalDateTime createdAt;

    public static ChatMessageResponseDto from(ChatMessage chatMessage) {
        return ChatMessageResponseDto.builder()
            .id(chatMessage.getId())
            .chatRoomId(chatMessage.getChatRoom().getId())
            .senderId(chatMessage.getSenderId())
            .content(chatMessage.getContent())
            .createdAt(chatMessage.getCreatedAt())
            .build();
    }
}
