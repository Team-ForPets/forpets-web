package com.forpets.be.domain.volunteerworkstatus.dto.response;

import com.forpets.be.domain.animal.entity.MyAnimal;
import com.forpets.be.domain.chat.chatroom.entity.ChatRoom;
import com.forpets.be.domain.user.entity.User;
import com.forpets.be.domain.volunteerworkstatus.entity.VolunteerStatus;
import com.forpets.be.domain.volunteerworkstatus.entity.VolunteerWorkStatus;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class VolunteerWorkStatusResponseDto {

    private final Long id;
    private final Long chatRoomId;
    private final String imageUrl;
    private final String animalName;
    private final String requestorNickname;
    private final String volunteerNickname;
    private final String departureArea;
    private final String arrivalArea;
    private final VolunteerStatus status;
    private final LocalDateTime createdAt;
    private final LocalDateTime updatedAt;

    public static VolunteerWorkStatusResponseDto from(VolunteerWorkStatus volunteerWorkStatus, ChatRoom chatRoom,
        MyAnimal myAnimal, User requestor, User volunteer) {
        return VolunteerWorkStatusResponseDto.builder()
            .id(volunteerWorkStatus.getId())
            .chatRoomId(chatRoom.getId())
            .imageUrl(myAnimal.getImageUrl())
            .animalName(myAnimal.getAnimalName())
            .requestorNickname(requestor.getNickname())
            .volunteerNickname(volunteer.getNickname())
            .departureArea(myAnimal.getDepartureArea())
            .arrivalArea(myAnimal.getArrivalArea())
            .status(volunteerWorkStatus.getStatus())
            .createdAt(volunteerWorkStatus.getCreatedAt())
            .updatedAt(volunteerWorkStatus.getUpdatedAt())
            .build();
    }
}
