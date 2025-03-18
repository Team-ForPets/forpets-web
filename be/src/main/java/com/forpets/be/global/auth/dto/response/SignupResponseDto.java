package com.forpets.be.global.auth.dto.response;


import com.forpets.be.domain.user.entity.Role;
import com.forpets.be.domain.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignupResponseDto {

    private String username;
    private String nickname;
    private Role role;

    public static SignupResponseDto from(User entity) {
        return SignupResponseDto.builder()
            .username(entity.getUsername())
            .nickname(entity.getNickname())
            .role(entity.getRole())
            .build();
    }
}
