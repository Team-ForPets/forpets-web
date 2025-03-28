package com.forpets.be.domain.chat.chatmessage.repository;

import com.forpets.be.domain.chat.chatmessage.entity.ChatMessage;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    // 해당 채팅방의 채팅 메시지 내역 조회
    List<ChatMessage> findByChatRoomId(@Param("chatRoomId") Long chatRoomId);
}
