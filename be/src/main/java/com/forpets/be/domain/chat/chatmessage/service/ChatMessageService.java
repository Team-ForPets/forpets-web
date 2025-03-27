package com.forpets.be.domain.chat.chatmessage.service;

import com.forpets.be.domain.chat.chatmessage.dto.request.ChatMessageRequestDto;
import com.forpets.be.domain.chat.chatmessage.entity.ChatMessage;
import com.forpets.be.domain.chat.chatmessage.repository.ChatMessageRepository;
import com.forpets.be.domain.chat.chatroom.entity.ChatRoom;
import com.forpets.be.domain.chat.chatroom.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChatMessageService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;

    // 채팅 메시지 전송
    @Transactional
    public ChatMessage sendMessage(Long chatRoomId, ChatMessageRequestDto requestDto) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
            .orElseThrow(() -> new IllegalArgumentException("해당 채팅방을 찾을 수 없습니다."));

        ChatMessage chatMessage = requestDto.toEntity(chatRoom);

        return chatMessageRepository.save(chatMessage);
    }
}
