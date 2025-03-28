package com.forpets.be.global.auth.dto.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class TokenResponseDto {

    private final String accessToken;
    private final Long userId;
}
