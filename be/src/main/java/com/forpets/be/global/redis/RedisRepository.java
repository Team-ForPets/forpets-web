package com.forpets.be.global.redis;

import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RedisRepository {

    public static final String KEY_REFRESH = "refresh_token:";
    public static final String KEY_BLACKLIST = "black_list:";
    public static final int REDIS_BLACKLIST_TOKEN_TIMEOUT = 10;
    public static final int REDIS_REFRESH_TOKEN_TIMEOUT = 7;

    private final StringRedisTemplate stringRedisTemplate;

    // 사용자 ID에 해당하는 토큰을 저장하고, 10일 후 만료되도록 설정.
    public void storeBlackListToken(String username, String token) {
        String key = KEY_BLACKLIST + username;  // key 예: "token:user123"
        stringRedisTemplate.opsForValue()
            .set(key, token, REDIS_BLACKLIST_TOKEN_TIMEOUT, TimeUnit.DAYS);
    }

    // 사용자 ID에 해당하는 토큰을 저장하고, 7일 후 만료되도록 설정.
    public void storeRefreshToken(String username, String token) {
        String key = KEY_REFRESH + username;  // key 예: "token:user123"
        stringRedisTemplate.opsForValue()
            .set(key, token, REDIS_REFRESH_TOKEN_TIMEOUT, TimeUnit.DAYS);
    }

    // 저장된 토큰을 조회하는 메서드
    public String getBlackListToken(String username) {
        String key = KEY_BLACKLIST + username;
        return stringRedisTemplate.opsForValue().get(key);
    }

    public String getRefreshToken(String username) {
        String key = KEY_REFRESH + username;
        return stringRedisTemplate.opsForValue().get(key);
    }

    // 토큰을 삭제 메서드
    public void deleteBlackListToken(String username) {
        String key = KEY_BLACKLIST + username;
        stringRedisTemplate.delete(key);
    }

    public void deleteRefreshToken(String username) {
        String key = KEY_REFRESH + username;
        stringRedisTemplate.delete(key);
    }

    // 지정된 키의 TTL을 일 단위로 반환합니다.
    public long getTTL(String username) {
        String key = KEY_REFRESH + username;
        return stringRedisTemplate.getExpire(key, TimeUnit.DAYS);
    }

}
