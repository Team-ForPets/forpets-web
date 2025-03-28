package com.forpets.be.global.auth.service;


import com.forpets.be.domain.user.entity.Role;
import com.forpets.be.domain.user.entity.User;
import com.forpets.be.domain.user.repository.UserRepository;
import java.util.Collections;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest)
        throws OAuth2AuthenticationException {

        // 소셜에서 인증 받은 유저 정보 가져오기
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        // 소셜 로그인 서비스 제공자 이름(google, kakao, naver)
        String provider = oAuth2UserRequest.getClientRegistration().getRegistrationId();

        log.info("유저 서비스에서의 프로바이더 : {}", provider);

        // 어떤 소셜 서비스인지에 따라 정보를 다르게 매핑해서 저장
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfo.of(provider, oAuth2User.getAttributes());

        log.info("OAuth2UserInfo Attributes: {}", oAuth2User.getAttributes());
        log.info("OAuth2UserInfo Email: {}", oAuth2UserInfo.getUsername());
        log.info("OAuth2UserInfo Provider: {}", oAuth2UserInfo.getProvider());

        System.out.println(oAuth2UserInfo.getProvider());
        // 가입한 유저인지 확인(
        User user = userRepository.findByUsername(oAuth2UserInfo.getUsername())
            .orElseGet(() -> saveUser(oAuth2UserInfo, provider));
        log.info("유저 이메일 : {}", user.getUsername());

        String socialName = "";

        if (provider.equals("google")) {
            socialName = "sub";
        } else if (provider.equals("kakao")) {
            socialName = "id";
        } else if (provider.equals("naver")) {
            socialName = "response";
        }
        log.info(socialName);

        return new DefaultOAuth2User(
            Collections.emptySet(),
            oAuth2User.getAttributes(),
//            "id"
            socialName
        );
//        Map<String, Object> attributes = oAuth2User.getAttributes();
//
//        String socialName = "";
//        if (provider.equals("google")) {
//            socialName = "sub";
//        } else if (provider.equals("naver")) {
//            attributes = (Map<String, Object>) attributes.get("response");
//            socialName = "id";
//        } else if (provider.equals("kakao")) {
//            socialName = "id";
//        }
//        log.info(socialName);
//
//        return new DefaultOAuth2User(
//            Collections.emptySet(),
//            attributes,
//            socialName
//        );
    }

    public String generateUniqueNickname(UserRepository userRepository) {
        String nickname;
        do {
            nickname = NicknameGenerator.generateRandomNickname();
        } while (userRepository.existsByNickname(nickname)); // 중복되면 다시 생성
        return nickname;
    }

    private User saveUser(OAuth2UserInfo userInfo, String provider) {
        // 새로운 유저 저장
        String nickname = generateUniqueNickname(userRepository);
        User newUser = User.builder()
            .username(userInfo.getUsername())  // username을 소셜 로그인 ID로 설정
            .password(UUID.randomUUID().toString())
            .nickname(nickname)  // 실제 사용 X
            .snsProvider(provider)
            .role(Role.ROLE_USER)
            .build();
        return userRepository.save(newUser);
    }
}
