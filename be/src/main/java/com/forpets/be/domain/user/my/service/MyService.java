package com.forpets.be.domain.user.my.service;

import com.forpets.be.domain.user.entity.User;
import com.forpets.be.domain.user.my.dto.response.MyProfileResponseDto;
import com.forpets.be.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MyService {
    private final UserRepository userRepository;

    // 나의 프로필(회원정보) 조회
    public MyProfileResponseDto getMyProfile(User user) {
        User me = userRepository.findByUsername(user.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));

        return MyProfileResponseDto.from(me);
    }
}
