package com.forpets.be.domain.chat.chatroom.controller;

import com.forpets.be.domain.chat.chatroom.dto.request.ChatRoomRequestDto;
import com.forpets.be.domain.chat.chatroom.dto.request.ChatRoomUpdateRequestRecord;
import com.forpets.be.domain.chat.chatroom.dto.response.ChatRoomDetailResponseDto;
import com.forpets.be.domain.chat.chatroom.dto.response.ChatRoomResponseDto;
import com.forpets.be.domain.chat.chatroom.dto.response.RequestorChatRoomsListResponseDto;
import com.forpets.be.domain.chat.chatroom.dto.response.VolunteerChatRoomsListResponseDto;
import com.forpets.be.domain.chat.chatroom.service.ChatRoomService;
import com.forpets.be.domain.user.entity.User;
import com.forpets.be.global.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
        @RequestBody @Valid ChatRoomRequestDto requestDto, @AuthenticationPrincipal User user) {
        return ResponseEntity.status(HttpStatus.CREATED).body(
            ApiResponse.ok("채팅방이 생성되었습니다.", "CREATED",
                chatRoomService.createChatRoom(requestDto, user)));
    }

    // 내가 요청자로 속한 채팅방 전체 조회
    @GetMapping("/requestor")
    public ResponseEntity<ApiResponse<RequestorChatRoomsListResponseDto>> getRequestorChatRooms(
        @RequestParam Long requestorId) {
        return ResponseEntity.ok(ApiResponse.ok("요청자로 속한 채팅방 리스트가 조회되었습니다.", "OK",
            chatRoomService.getRequestorChatRooms(requestorId)));
    }

    // 내가 봉사자로 속한 채팅방 전체 조회
    @GetMapping("/volunteer")
    public ResponseEntity<ApiResponse<VolunteerChatRoomsListResponseDto>> getVolunteerChatRooms(
        @RequestParam Long volunteerId) {
        return ResponseEntity.ok(ApiResponse.ok("봉사자로 속한 채팅방 리스트가 조회되었습니다.", "OK",
            chatRoomService.getVolunteerChatRooms(volunteerId)));
    }

    // 채팅방 개별 조회
    @GetMapping("/{chatRoomId}")
    public ResponseEntity<ApiResponse<ChatRoomDetailResponseDto>> getChatRoom(
        @PathVariable Long chatRoomId) {
        return ResponseEntity.ok(ApiResponse.ok(chatRoomId + "번 채팅방이 조회되었습니다.", "OK",
            chatRoomService.getChatRoomById(chatRoomId)));
    }

    // 채팅방 수정
    @PatchMapping("/{chatRoomId}")
    public ResponseEntity<ApiResponse<ChatRoomResponseDto>> updateChatRoom(
        @PathVariable Long chatRoomId,
        @RequestBody @Valid ChatRoomUpdateRequestRecord requestRecord,
        @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(ApiResponse.ok(chatRoomId + "번 채팅방이 수정되었습니다.", "OK",
            chatRoomService.updateChatRoom(chatRoomId, requestRecord, user)));
    }
}
