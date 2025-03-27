package com.forpets.be.domain.user.dto.response;

import com.forpets.be.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class UserNickNameImageResponseDto {

    private Long id;
    private String nickName;
    private String imageUrl;

    public static UserNickNameImageResponseDto from(User user) {
        return UserNickNameImageResponseDto.builder()
            .id(user.getId())
            .nickName(user.getNickname())
            .imageUrl(user.getImageUrl())
            .build();

    }
}
