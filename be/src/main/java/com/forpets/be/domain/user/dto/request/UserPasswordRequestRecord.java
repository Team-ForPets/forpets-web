package com.forpets.be.domain.user.dto.request;

import jakarta.validation.constraints.NotBlank;

public record UserPasswordRequestRecord(@NotBlank(message = "비밀번호는 필수 입력값입니다.") String password) {
    
}
