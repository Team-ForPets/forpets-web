package com.forpets.be.domain.chat.chatroom.dto.response;

import com.forpets.be.domain.animal.dto.response.MyAnimalReadResponseDto;
import com.forpets.be.domain.chat.chatmessage.dto.response.ChatMessageResponseDto;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChatRoomDetailResponseDto {

    private Long id;
    private String nickname;
    private String departureArea;
    private String arrivalArea;

    private MyAnimalReadResponseDto myAnimal;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<ChatMessageResponseDto> chatMessages;
}
