package com.forpets.be.global.security.jwt;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class TokenAndIdDto {

    private final String accessToken;
    private final String refreshToken;
    private final Long userId;
}
