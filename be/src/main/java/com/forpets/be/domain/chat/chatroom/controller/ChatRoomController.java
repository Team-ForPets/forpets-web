package com.forpets.be.domain.chat.chatroom.controller;

import com.forpets.be.domain.chat.chatroom.dto.request.ChatRoomRequestDto;
import com.forpets.be.domain.chat.chatroom.dto.response.ChatRoomResponseDto;
import com.forpets.be.domain.chat.chatroom.dto.response.VolunteerChatRoomListResponseDto;
import com.forpets.be.domain.chat.chatroom.service.ChatRoomService;
import com.forpets.be.domain.user.entity.User;
import com.forpets.be.global.response.ApiResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat/rooms")
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    // 채팅방 생성
    @PostMapping
    public ResponseEntity<ApiResponse<ChatRoomResponseDto>> createChatRoom(
        @RequestBody ChatRoomRequestDto requestDto, @AuthenticationPrincipal User user) {
        return ResponseEntity.status(HttpStatus.CREATED).body(
            ApiResponse.ok("채팅방이 생성되었습니다.", "CREATED",
                chatRoomService.createChatRoom(requestDto, user)));
    }

    // 내가 요청자로 속한 채팅방 전체 조회
    @GetMapping
    public ResponseEntity<ApiResponse<List<VolunteerChatRoomListResponseDto>>> getChatRooms(
        @RequestParam Long requestorId) {
        return ResponseEntity.ok(ApiResponse.ok("요청자로 속한 채팅방 리스트가 조회되었습니다.", "OK",
            chatRoomService.getChatRooms(requestorId)));
    }
}
