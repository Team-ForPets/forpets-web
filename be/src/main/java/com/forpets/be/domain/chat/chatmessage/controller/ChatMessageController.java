package com.forpets.be.domain.chat.chatmessage.controller;

import com.forpets.be.domain.chat.chatmessage.dto.request.ChatMessageRequestDto;
import com.forpets.be.domain.chat.chatmessage.service.ChatMessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ChatMessageController {

    private final SimpMessagingTemplate messagingTemplate;
    private final ChatMessageService chatMessageService;

    // 채팅방 입장 메시지 발신
    @MessageMapping("/chat/rooms/{chatRoomId}/enter")
    public void enterMessage(@DestinationVariable Long chatRoomId,
        @Payload @Valid ChatMessageRequestDto requestDto) {
        chatMessageService.enterMessage(chatRoomId, requestDto);
    }

    // 채팅 메시지 발신
    // 메시지 전송에 대한 API Path 설정
    // `/pub/chat/rooms/{chatRoomId}/message` 로 요청이 들어오면 메시지 전송
    @MessageMapping("/chat/rooms/{chatRoomId}/message")
    public void sendMessage(@DestinationVariable Long chatRoomId,
        @Payload @Valid ChatMessageRequestDto requestDto) {

        chatMessageService.sendMessage(chatRoomId, requestDto);

        // 메시지 수신할 특정 토픽 설정
        messagingTemplate.convertAndSend("/sub/chat/rooms/" + chatRoomId, requestDto);
    }

    // 채팅방 퇴장 메시지 발신
    @MessageMapping("/chat/rooms/{chatRoomId}/leave")
    public void leaveMessage(@DestinationVariable Long chatRoomId,
        @Payload @Valid ChatMessageRequestDto requestDto) {
        chatMessageService.leaveMessage(chatRoomId, requestDto);
    }
}
