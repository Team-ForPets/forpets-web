package com.forpets.be.domain.chat.chatroom.dto.response;

import com.forpets.be.domain.animal.dto.response.MyAnimalReadResponseDto;
import com.forpets.be.domain.chat.chatmessage.dto.response.ChatMessageResponseDto;
import com.forpets.be.domain.chat.chatroom.entity.RoomState;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChatRoomDetailResponseDto {

    private Long id;
    private String nickName;
    private String departureArea;
    private String arrivalArea;

    private MyAnimalReadResponseDto myAnimal;
    private RoomState state;
    private List<ChatMessageResponseDto> chatMessages;

    public static ChatRoomDetailResponseDto from(Long chatRoomId, String nickname,
        String departureArea,
        String arrivalArea, MyAnimalReadResponseDto responseDto, RoomState state,
        List<ChatMessageResponseDto> chatMessages) {
        return ChatRoomDetailResponseDto.builder()
            .id(chatRoomId)
            .nickName(nickname)
            .departureArea(departureArea)
            .arrivalArea(arrivalArea)
            .myAnimal(responseDto)
            .state(state)
            .chatMessages(chatMessages)
            .build();
    }
}
