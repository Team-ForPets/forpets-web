package com.forpets.be.domain.chat.chatroom.entity;

import com.forpets.be.domain.animal.entity.MyAnimal;
import com.forpets.be.domain.chat.chatmessage.entity.ChatMessage;
import com.forpets.be.domain.user.entity.User;
import com.forpets.be.domain.volunteerwork.entity.VolunteerWork;
import com.forpets.be.global.entity.BaseTimeEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class ChatRoom extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_room_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "my_animal_id", nullable = false)
    private MyAnimal myAnimal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_volunteer_id")
    private VolunteerWork volunteerWork;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requestor_user_id", nullable = false)
    private User requestor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "volunteer_user_id", nullable = false)
    private User volunteer;

    @OneToMany(mappedBy = "chatRoom", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<ChatMessage> chatMessages = new ArrayList<>();

    @Column(nullable = false)
    private boolean isRequestorLeft;

    @Column(nullable = false)
    private boolean isVolunteerLeft;

    @Builder
    public ChatRoom(MyAnimal myAnimal, VolunteerWork volunteerWork, User requestor,
        User volunteer) {
        this.myAnimal = myAnimal;
        this.volunteerWork = volunteerWork;
        this.requestor = requestor;
        this.volunteer = volunteer;
        this.isRequestorLeft = false;
        this.isVolunteerLeft = false;
    }

    // 채팅 메시지를 추가하는 연관관계 편의 메서드
    public void addChatMessage(ChatMessage chatMessage) {
        chatMessages.add(chatMessage);
        chatMessage.setChatRoom(this);
    }

    // 요청자가 채팅방에서 나갔는지 설정
    public void setIsRequestorLeft(boolean isLeft) {
        this.isRequestorLeft = isLeft;
    }

    // 봉사자가 채팅방에 나갔는지 설정
    public void setIsVolunteerLeft(boolean isLeft) {
        this.isVolunteerLeft = isLeft;
    }
}
