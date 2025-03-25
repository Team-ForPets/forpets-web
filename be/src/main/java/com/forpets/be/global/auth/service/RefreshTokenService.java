package com.forpets.be.global.auth.service;

import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RefreshTokenService {

    public static final String KEY_REFRESH = "refresh_token:";
    public static final int REDIS_REFRESH_TOKEN_TIMEOUT = 7;
    private final StringRedisTemplate stringRedisTemplate;

    // 사용자 ID에 해당하는 토큰을 저장하고, 7일 후 만료되도록 설정.
    public void storeRefreshToken(String username, String token) {
        String key = KEY_REFRESH + username;  // key 예: "token:user123"
        stringRedisTemplate.opsForValue()
            .set(key, token, REDIS_REFRESH_TOKEN_TIMEOUT, TimeUnit.DAYS);
    }

}
