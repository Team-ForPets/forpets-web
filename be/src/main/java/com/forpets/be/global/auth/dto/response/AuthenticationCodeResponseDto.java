package com.forpets.be.global.auth.dto.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class AuthenticationCodeResponseDto {

    private final String code;
}
