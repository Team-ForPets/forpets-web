package com.forpets.be.domain.chat.chatroom.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomRequestDto {

    @NotNull
    private Long myAnimalId;

    private Long volunteerWorkId;
}
