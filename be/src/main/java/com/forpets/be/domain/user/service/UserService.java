package com.forpets.be.domain.user.service;

import com.forpets.be.domain.user.dto.request.UserPasswordRequestRecord;
import com.forpets.be.domain.user.dto.response.UserCheckResponseDto;
import com.forpets.be.domain.user.entity.User;
import com.forpets.be.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserCheckResponseDto checkUsername(String username) {
        boolean isAvailable = !userRepository.existsByUsername(username);
        String message = isAvailable ? "사용 가능한 아이디입니다." : "이미 사용 중인 아이디입니다.";
        return new UserCheckResponseDto(message, isAvailable);
    }

    public UserCheckResponseDto checkNickname(String nickname) {
        boolean isAvailable = !userRepository.existsByNickname(nickname);
        String message = isAvailable ? "사용 가능한 닉네임입니다." : "이미 사용 중인 닉네임입니다.";
        return new UserCheckResponseDto(message, isAvailable);
    }

    // 회원정보 수정 시 비밀번호 검증
    public UserCheckResponseDto checkPassword(UserPasswordRequestRecord requestRecord, User user) {
        // DB에 있는 비밀번호는 해싱되어 있으므로 matches 메서드를 통해 일치 여부를 확인
        boolean isMatched = passwordEncoder.matches(requestRecord.password(), user.getPassword());

        String result = isMatched ? "비밀번호가 확인되었습니다." : "입력하신 비밀번호가 일치하지 않습니다.";

        return new UserCheckResponseDto(result, isMatched);
    }
}
