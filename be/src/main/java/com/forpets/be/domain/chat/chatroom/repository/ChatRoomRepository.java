package com.forpets.be.domain.chat.chatroom.repository;

import com.forpets.be.domain.chat.chatroom.entity.ChatRoom;
import com.forpets.be.domain.user.entity.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    // 나의 아이 등록글과 봉사 등록글 id를 확인하고 특정 게시글에서 시작된 채팅방이 이미 존재하는지 확인
    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN TRUE ELSE FALSE END "
        + "FROM ChatRoom c "
        + "WHERE c.requestor = :requestor AND c.volunteer = :volunteer "
        + "AND (c.myAnimal.id = :myAnimalId OR c.volunteerWork.id = :volunteerWorkId)")
    boolean existsRoomByRequestorAndVolunteerAndPost(
        @Param("requestor") User requestor,
        @Param("volunteer") User volunteer,
        @Param("myAnimalId") Long myAnimalId,
        @Param("volunteerWorkId") Long volunteerWorkId);

    // 내가 요청자로 속한 채팅방 전체 조회
    @Query("SELECT c FROM ChatRoom c "
        + "JOIN FETCH c.requestor r "
        + "WHERE r.id = :requestorId")
    List<ChatRoom> findAllByRequestorId(@Param("requestorId") Long requestorId);

    // 내가 봉사자로 속한 채팅방 전체 조회
    @Query("SELECT c FROM ChatRoom c "
        + "JOIN FETCH c.volunteer v "
        + "WHERE v.id = :volunteerId")
    List<ChatRoom> findAllByVolunteerId(@Param("volunteerId") Long volunteerId);

    // 해당 유저가 해당 채팅방에 요청자 또는 봉사자로 이미 참여하고 있는지 확인
    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN TRUE ELSE FALSE END "
        + "FROM ChatRoom c "
        + "WHERE c.id = :chatRoomId AND (c.requestor.id = :userId OR c.volunteer.id = :userId)")
    boolean existsUserByRequestorAndVolunteer(@Param("chatRoomId") Long chatRoomId,
        @Param("userId") Long userId);

    // 채팅방에서 필요한 연관 데이터들을 한 번에 조회
    @Query("SELECT cr FROM ChatRoom cr "
        + "JOIN FETCH cr.myAnimal ma "
        + "LEFT JOIN FETCH cr.volunteerWork v "
        + "WHERE cr.id = :chatRoomId")
    Optional<ChatRoom> findChatRoomWithDetails(@Param("chatRoomId") Long chatRoomId);
}
