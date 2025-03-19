package com.forpets.be.domain.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserCheckResponseDto {

    private String message;
    private boolean available;
}
