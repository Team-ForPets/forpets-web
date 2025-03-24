package com.forpets.be.global.util;

public class CookieMaker {

    public static final int MAX_AGE = 7 * 24 * 60 * 60;

    public static jakarta.servlet.http.Cookie makeRefreshTokenCookie(String refreshToken,
        int maxAge) {
        jakarta.servlet.http.Cookie refreshTokenCookie = new jakarta.servlet.http.Cookie(
            "refresh_token", refreshToken);
        refreshTokenCookie.setHttpOnly(true);             // 자바스크립트 접근 차단
//        refreshTokenCookie.setSecure(true);             // HTTPS 전송 시에만 쿠키 전달 (HTTPS 환경일 때)
        refreshTokenCookie.setPath("/");                  // 애플리케이션 전체에 대해 유효
        refreshTokenCookie.setMaxAge(maxAge);   // 예: 쿠키 만료시간을 7일로 설정 (초 단위)

        return refreshTokenCookie;
    }


}
