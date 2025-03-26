package com.forpets.be.domain.chat.chatroom.entity;

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

    // Todo: 나의 아이 필드도 필요

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_volunteer_id")
    private ServiceVolunteer serviceVolunteer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requestor_user_id")
    private User requestor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "volunteer_user_id")
    private User volunteer;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RoomState state;

    @Builder
    public ChatRoom(ServiceVolunteer serviceVolunteer, User requestor, User volunteer) {
        this.serviceVolunteer = serviceVolunteer;
        this.requestor = requestor;
        this.volunteer = volunteer;
        this.state = RoomState.getDefault();
    }
}
