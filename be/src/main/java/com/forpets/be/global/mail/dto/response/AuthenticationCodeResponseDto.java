package com.forpets.be.global.mail.dto.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class AuthenticationCodeResponseDto {

    private final String statusMessage;
    private final Boolean status;
}
