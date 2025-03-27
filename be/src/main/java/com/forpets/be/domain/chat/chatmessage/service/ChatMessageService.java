package com.forpets.be.domain.chat.chatmessage.service;

import com.forpets.be.domain.chat.chatmessage.dto.request.ChatMessageRequestDto;
import com.forpets.be.domain.chat.chatmessage.entity.ChatMessage;
import com.forpets.be.domain.chat.chatmessage.repository.ChatMessageRepository;
import com.forpets.be.domain.chat.chatroom.entity.ChatRoom;
import com.forpets.be.domain.chat.chatroom.repository.ChatRoomRepository;
import com.forpets.be.domain.user.entity.User;
import com.forpets.be.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChatMessageService {

    private final ChatRoomRepository chatRoomRepository;
    private final UserRepository userRepository;
    private final ChatMessageRepository chatMessageRepository;

    // 채팅방 입장 메시지 발신
    @Transactional
    public ChatMessage enterMessage(Long chatRoomId, ChatMessageRequestDto requestDto) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
            .orElseThrow(() -> new IllegalArgumentException("해당 채팅방이 존재하지 않습니다."));

        User user = userRepository.findById(requestDto.getSenderId())
            .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 존재하지 않습니다."));

        ChatMessage editMessage = requestDto.toEntity(chatRoom);
        // 채팅방 입장 사용자의 닉네임을 표시하도록 내용 업데이트
        editMessage.updateContent(user.getNickname() + "님이 채팅방에 입장하셨습니다.");

        return chatMessageRepository.save(editMessage);
    }

    // 채팅 메시지 전송
    @Transactional
    public ChatMessage sendMessage(Long chatRoomId, ChatMessageRequestDto requestDto) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
            .orElseThrow(() -> new IllegalArgumentException("해당 채팅방을 찾을 수 없습니다."));

        ChatMessage chatMessage = requestDto.toEntity(chatRoom);

        return chatMessageRepository.save(chatMessage);
    }
}
