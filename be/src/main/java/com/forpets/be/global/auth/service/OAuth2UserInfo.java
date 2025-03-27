package com.forpets.be.global.auth.service;

import com.forpets.be.domain.user.entity.User;
import java.util.Map;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Builder
@Getter
@ToString
public class OAuth2UserInfo {

    private String id;
    private String password;
    private String username;
    private String nickname;
    private String provider;

    public static OAuth2UserInfo of(String provider, Map<String, Object> attributes) {
        switch (provider) {
            case "google":
                return ofGoogle(attributes);
            case "kakao":
                return ofKakao(attributes);
            case "naver":
                return ofNaver(attributes);
            default:
                throw new RuntimeException();
        }
    }

    private static OAuth2UserInfo ofGoogle(Map<String, Object> attributes) {
        return OAuth2UserInfo.builder()
            .provider("google")
            .id("google_" + (String) attributes.get("sub"))
            .password((String) attributes.get("sub"))
            .nickname((String) attributes.get("name"))
            .username((String) attributes.get("email"))
            .build();
    }

    private static OAuth2UserInfo ofKakao(Map<String, Object> attributes) {
        return OAuth2UserInfo.builder()
            .provider("kakao")
            .id("kakao_" + attributes.get("id").toString())
            .password(attributes.get("id").toString())
            .username((String) ((Map) attributes.get("kakao_account")).get("email")) // 이메일 정보 추출
//            .nickname((String) ((Map) attributes.get("properties")).get("nickname"))
            .build();
    }

    private static OAuth2UserInfo ofNaver(Map<String, Object> attributes) {
        return OAuth2UserInfo.builder()
            .provider("naver")
            .id("naver_" + (String) ((Map) attributes.get("response")).get("id"))
            .password((String) ((Map) attributes.get("response")).get("id"))
//            .nickname((String) ((Map) attributes.get("response")).get("name"))
            .build();
    }

    public User toEntity() {
        return User.builder()
            .username(id)
            .password(password)
            .snsProvider(provider)
            .nickname(nickname)
            .username(username)
            .build();
    }
}
