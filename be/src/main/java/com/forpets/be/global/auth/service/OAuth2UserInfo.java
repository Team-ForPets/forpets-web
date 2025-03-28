package com.forpets.be.global.auth.service;

import com.forpets.be.domain.user.entity.User;
import java.util.Map;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Builder
@Getter
@ToString
public class OAuth2UserInfo {

    //    private String id;
    private String password;
    private String username;
    private String nickname;
    private String provider;

    public static OAuth2UserInfo of(String provider, Map<String, Object> attributes) {
        log.info("유저인포에서의 프로바이더 : {}", provider);
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
//            .id("google_" + (String) attributes.get("sub"))
            .password((String) attributes.get("sub"))
            .nickname((String) attributes.get("name"))
            .username((String) attributes.get("email"))
            .build();
    }

    private static OAuth2UserInfo ofKakao(Map<String, Object> attributes) {
        return OAuth2UserInfo.builder()
            .provider("kakao")
//            .id("kakao_" + attributes.get("id").toString())
            .password(attributes.get("id").toString())
            .username((String) ((Map) attributes.get("kakao_account")).get("email")) // 이메일 정보 추출
//            .nickname((String) ((Map) attributes.get("properties")).get("nickname"))
            .build();
    }

    private static OAuth2UserInfo ofNaver(Map<String, Object> attributes) {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");
        String email = response.containsKey("email_address") ?
            (String) response.get("email_address") :
            (String) response.get("email");
        
        return OAuth2UserInfo.builder()
            .provider("naver")
//            .id("naver_" + (String) ((Map) attributes.get("response")).get("id"))
            .username(email)
            // 연락처 이메일 주소라 example@naver.com 이 아닐수도 있음
//            .username((String) ((Map) attributes.get("response")).get("email"))
            // 검수 완료 후 사용(진짜 네이버 이메일 주소)
//            .username((String) ((Map) attributes.get("response")).get("email_addressl"))
//            .password((String) ((Map) attributes.get("response")).get("id"))
//            .nickname((String) ((Map) attributes.get("response")).get("name"))
            .build();
    }

    public User toEntity() {
        log.info("유저인포에서의 유저네임 : {}", username);
        return User.builder()
            .username(username)
            .password(password)
            .snsProvider(provider)
            .nickname(nickname)
            .build();
    }
}
