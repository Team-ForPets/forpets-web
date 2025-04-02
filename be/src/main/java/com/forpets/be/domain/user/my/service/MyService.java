package com.forpets.be.domain.user.my.service;

import com.forpets.be.domain.user.dto.response.UserCheckResponseDto;
import com.forpets.be.domain.user.entity.User;
import com.forpets.be.domain.user.my.dto.request.UserPasswordRequestRecord;
import com.forpets.be.domain.user.my.dto.response.MyProfileResponseDto;
import com.forpets.be.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MyService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // 나의 프로필(회원정보) 조회
    public MyProfileResponseDto getMyProfile(User user) {
        User me = userRepository.findByUsername(user.getUsername())
            .orElseThrow(() -> new RuntimeException("User not found"));

        return MyProfileResponseDto.from(me);
    }

    // 회원정보 수정 시 비밀번호 검증
    public UserCheckResponseDto checkPassword(UserPasswordRequestRecord requestRecord, User user) {
        // DB에 있는 비밀번호는 해싱되어 있으므로 matches 메서드를 통해 일치 여부를 확인
        boolean isMatched = passwordEncoder.matches(requestRecord.password(), user.getPassword());

        String message = isMatched ? "비밀번호가 확인되었습니다." : "입력하신 비밀번호가 일치하지 않습니다.";

        return new UserCheckResponseDto(message, isMatched);
    }
}
