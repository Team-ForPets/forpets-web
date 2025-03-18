package com.forpets.be.global.auth.service;


import com.forpets.be.domain.user.entity.User;
import com.forpets.be.domain.user.repository.UserRepository;
import com.forpets.be.global.auth.dto.request.SignupRequestDto;
import com.forpets.be.global.auth.dto.response.SignupResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
//    private final

    @Transactional
    public SignupResponseDto signup(SignupRequestDto requestDto) {
        if (userRepository.existsByUsername(requestDto.getUsername())) {
            throw new IllegalArgumentException("이미 사용중인 이메일입니다.");
        }
        if (userRepository.existsByNickname(requestDto.getNickname())) {
            throw new IllegalArgumentException("이미 사용중인 닉네임입니다.");
        }
        // 비밀번호 암호와
        // requestDto를 통해 비밀번호를 가져온 뒤 passwordEncoder의 encode 메서드를 통해 암호화 후 저장
        String encodedPassword = passwordEncoder.encode(requestDto.getPassword());
        // 암호화 한 비밀번호를 repository에 넘겨 DB에 저장해야 하니 toEntity로 바꾸고 user로 저장
        User user = requestDto.toEntity(encodedPassword);
        // user data를 DB에 저장 후 ResponseDto에 매칭되는 데이터 반환
        return SignupResponseDto.from(userRepository.save(user));
    }
}
