package com.forpets.be.domain.chat.chatmessage.service;

import com.forpets.be.domain.chat.chatmessage.dto.request.ChatMessageRequestDto;
import com.forpets.be.domain.chat.chatmessage.entity.ChatMessage;
import com.forpets.be.domain.chat.chatmessage.repository.ChatMessageRepository;
import com.forpets.be.domain.chat.chatroom.entity.ChatRoom;
import com.forpets.be.domain.chat.chatroom.repository.ChatRoomRepository;
import com.forpets.be.domain.user.entity.User;
import com.forpets.be.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
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

        log.info("Sender ID- test1: {}", requestDto.getSenderId());

        User user = userRepository.findById(requestDto.getSenderId())
            .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 존재하지 않습니다."));

        ChatMessage editMessage = requestDto.toEntity(chatRoom);

        // 해당 유저가 이미 해당 채팅방에 requestor 또는 volunteer로 존재하지 않으면 입장 메시지 발신
        if (!chatRoomRepository.existsUserByRequestorAndVolunteer(chatRoomId, user.getId())) {
            // 채팅방 입장 사용자의 닉네임을 표시하도록 내용 업데이트
            editMessage.updateContent(user.getNickname() + "님이 채팅방에 입장하셨습니다.");

            // 연관관계 설정 (chatRoom에 채팅 메시지 추가)
            chatRoom.addChatMessage(editMessage);

            chatMessageRepository.save(editMessage);
        }

        return editMessage;
    }

    // 채팅 메시지 전송
    @Transactional
    public ChatMessage sendMessage(Long chatRoomId, ChatMessageRequestDto requestDto) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
            .orElseThrow(() -> new IllegalArgumentException("해당 채팅방이 존재하지 않습니다."));

        User user = userRepository.findById(requestDto.getSenderId())
            .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 존재하지 않습니다."));

        ChatMessage chatMessage = requestDto.toEntity(chatRoom);

        // 채팅보낼 때 해당 채팅방에 속한 참여자가 맞는지 검증하는 로직 추가
        if (!chatRoomRepository.existsUserByRequestorAndVolunteer(chatRoomId, user.getId())) {
            throw new IllegalArgumentException("해당 사용자는 해당 채팅방에 속한 참여자가 아닙니다.");
        }

        // 연관관계 설정 (chatRoom에 채팅 메시지 추가)
        chatRoom.addChatMessage(chatMessage);

        return chatMessageRepository.save(chatMessage);
    }

    // 채팅방 퇴장 메시지 발신
    @Transactional
    public ChatMessage leaveMessage(Long chatRoomId, ChatMessageRequestDto requestDto) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
            .orElseThrow(() -> new IllegalArgumentException("해당 채팅방이 존재하지 않습니다."));

        log.info("Sender ID- test2: {}", requestDto.getSenderId());

        User user = userRepository.findById(requestDto.getSenderId())
            .orElseThrow(() -> new IllegalArgumentException("해당 사용자가 존재하지 않습니다."));

        ChatMessage editMessage = requestDto.toEntity(chatRoom);

        // 해당 유저가 이미 해당 채팅방에 requestor 또는 volunteer로 존재하면 퇴장 메시지 발신
        if (chatRoomRepository.existsUserByRequestorAndVolunteer(chatRoomId, user.getId())) {
            // 채팅방 퇴장 사용자의 닉네임을 표시하도록 내용 업데이트
            editMessage.updateContent(user.getNickname() + "님이 채팅방에서 퇴장하셨습니다.");

            // 연관관계 설정 (chatRoom에 채팅 메시지 추가)
            chatRoom.addChatMessage(editMessage);

            chatMessageRepository.save(editMessage);
        }

        return editMessage;
    }
}
