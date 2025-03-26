package com.forpets.be.domain.chat.chatroom.controller;

import com.forpets.be.domain.chat.chatroom.dto.request.ChatRoomRequestDto;
import com.forpets.be.domain.chat.chatroom.dto.response.ChatRoomResponseDto;
import com.forpets.be.domain.chat.chatroom.service.ChatRoomService;
import com.forpets.be.domain.user.entity.User;
import com.forpets.be.global.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat/rooms")
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    @PostMapping
    public ResponseEntity<ApiResponse<ChatRoomResponseDto>> createChatRoom(
        @RequestBody ChatRoomRequestDto requestDto, @AuthenticationPrincipal User user) {
        return ResponseEntity.status(HttpStatus.CREATED).body(
            ApiResponse.ok("채팅방이 생성되었습니다.", "CREATED",
                chatRoomService.createChatRoom(requestDto, user)));
    }
}
