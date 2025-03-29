package com.forpets.be.domain.chat.chatroom.entity;

import com.forpets.be.domain.animal.entity.MyAnimal;
import com.forpets.be.domain.servicevolunteer.entity.ServiceVolunteer;
import com.forpets.be.domain.user.entity.User;
import com.forpets.be.global.entity.BaseTimeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
    private ServiceVolunteer serviceVolunteer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requestor_user_id", nullable = false)
    private User requestor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "volunteer_user_id", nullable = false)
    private User volunteer;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoomState state;

    @Builder
    public ChatRoom(MyAnimal myAnimal, ServiceVolunteer serviceVolunteer, User requestor,
        User volunteer) {
        this.myAnimal = myAnimal;
        this.serviceVolunteer = serviceVolunteer;
        this.requestor = requestor;
        this.volunteer = volunteer;
        this.state = RoomState.getDefault();
    }

    // 채팅방 상태 업데이트
    public ChatRoom updateState(RoomState state) {
        this.state = state;

        return this;
    }
}
