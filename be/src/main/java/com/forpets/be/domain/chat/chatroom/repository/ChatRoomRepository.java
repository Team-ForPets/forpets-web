package com.forpets.be.domain.chat.chatroom.repository;

import com.forpets.be.domain.chat.chatroom.entity.ChatRoom;
import com.forpets.be.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    
    // 이미 존재하는 채팅방인지 확인
    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN TRUE ELSE FALSE END "
        + "FROM ChatRoom c "
        + "WHERE c.requestor = :requestor AND c.volunteer = :volunteer")
    boolean existsByRequestorAndVolunteer(@Param("requestor") User requestor,
        @Param("volunteer") User volunteer);
}
