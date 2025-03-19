package com.forpets.be.domain.user.service;

import com.forpets.be.domain.user.dto.response.UserCheckResponseDto;
import com.forpets.be.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

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
}
