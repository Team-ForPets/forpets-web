package com.forpets.be.domain.chat.chatmessage.repository;

import com.forpets.be.domain.chat.chatmessage.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

}
