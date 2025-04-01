package com.forpets.be.domain.chat.chatroom.dto.response;

import com.forpets.be.domain.animal.dto.response.MyAnimalResponseDto;
import com.forpets.be.domain.chat.chatmessage.dto.response.ChatMessageResponseDto;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChatRoomDetailResponseDto {

    private final Long id;
    private final String nickname;
    private final String departureArea;
    private final String arrivalArea;

    private final MyAnimalResponseDto myAnimal;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;
    private final List<ChatMessageResponseDto> chatMessages;
}
