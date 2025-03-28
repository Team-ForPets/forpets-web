package com.forpets.be.domain.chat.chatmessage.dto.request;

import com.forpets.be.domain.chat.chatmessage.entity.ChatMessage;
import com.forpets.be.domain.chat.chatroom.entity.ChatRoom;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageRequestDto {

    @NotNull
    private Long senderId;

    private String content;

    public ChatMessage toEntity(ChatRoom chatRoom) {
        return ChatMessage.builder()
            .chatRoom(chatRoom)
            .senderId(this.senderId)
            .content(this.content)
            .build();
    }
}
