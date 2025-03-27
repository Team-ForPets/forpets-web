package com.forpets.be.global.auth.service;

import java.util.Random;

public class NicknameGenerator {

    private static final String[] ADJECTIVES = {
        "행복한", "용감한", "빛나는", "따뜻한", "차가운", "멋진", "강한", "똑똑한", "귀여운", "재미있는"
    };
    private static final String[] NOUNS = {
        "호랑이", "사자", "토끼", "여우", "늑대", "펭귄", "코끼리", "고래", "부엉이", "다람쥐"
    };

    public static String generateRandomNickname() {
        Random random = new Random();
        String adjective = ADJECTIVES[random.nextInt(ADJECTIVES.length)];
        String noun = NOUNS[random.nextInt(NOUNS.length)];
        int number = random.nextInt(1000); // 0~999 랜덤 숫자 추가

        return adjective + noun + number;
    }

}
