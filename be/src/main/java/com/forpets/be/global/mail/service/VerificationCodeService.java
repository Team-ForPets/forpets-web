package com.forpets.be.global.mail.service;

import com.forpets.be.global.mail.dto.request.AuthenticationRequestDto;
import com.forpets.be.global.mail.dto.response.AuthenticationCodeResponseDto;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VerificationCodeService {
    // redis에 email을 키로, code를 밸류로 저장하는 로직임.

    private static final long CODE_EXPIRE_TIME = 3; // 3분 유효
    private final StringRedisTemplate redisTemplate;

    // 랜덤 code를 redis에 저장
    public void saveVerificationCode(String username, String code) {
        redisTemplate.opsForValue()
            .set(username, code, CODE_EXPIRE_TIME,
                TimeUnit.MINUTES);
    }

    // 이메일과 코드의 쌍을 검사하는 코드
    public AuthenticationCodeResponseDto verifyCode(AuthenticationRequestDto requestDto) {
        String storedCode = redisTemplate.opsForValue().get(requestDto.getUsername());

        if (storedCode != null && storedCode.equals(requestDto.getCode())) {
            return new AuthenticationCodeResponseDto("인증에 성공했습니다.", true);
        } else {
            return new AuthenticationCodeResponseDto("유효하지 않은 인증 코드입니다..", false);
        }
    }

}
