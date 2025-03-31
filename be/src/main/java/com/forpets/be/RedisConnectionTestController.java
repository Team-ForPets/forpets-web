package com.forpets.be;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RedisConnectionTestController {

    private final StringRedisTemplate redisTemplate;

    @GetMapping("/redis-test")
    public String testRedisConnection() {
        try {
            // Redis 연결 및 기본 작업 테스트
            redisTemplate.opsForValue().set("test-key", "test-value");
            String value = redisTemplate.opsForValue().get("test-key");
            return "Redis connection successful. Test value: " + value;
        } catch (Exception e) {
            // 자세한 예외 로깅
            e.printStackTrace();
            return "Redis connection failed: " + e.getMessage();
        }
    }
}