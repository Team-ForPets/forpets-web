package com.forpets.be.domain.chat.chatroom.dto.request;

import com.forpets.be.domain.chat.chatroom.entity.RoomState;
import jakarta.validation.constraints.NotNull;

public record ChatRoomUpdateRequestRecord(@NotNull(message = "상태는 필수 입력값입니다") RoomState state) {

}
