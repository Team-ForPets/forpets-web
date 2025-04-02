package com.forpets.be.domain.user.my.dto.response;

import com.forpets.be.domain.user.entity.User;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MyProfileUpdateResponseDto {

    private final String nickname;
    private final String imageUrl;

    public static MyProfileUpdateResponseDto from(User user, String imageUrl) {
        return MyProfileUpdateResponseDto.builder()
            .nickname(user.getNickname())
            .imageUrl(imageUrl)
            .build();
    }
}
