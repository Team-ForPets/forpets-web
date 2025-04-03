package com.forpets.be.domain.user.my.service;

import com.forpets.be.domain.user.dto.response.UserCheckResponseDto;
import com.forpets.be.domain.user.entity.User;
import com.forpets.be.domain.user.my.dto.request.MyProfileUpdateRequestDto;
import com.forpets.be.domain.user.my.dto.request.UserPasswordRequestRecord;
import com.forpets.be.domain.user.my.dto.response.MyProfileResponseDto;
import com.forpets.be.domain.user.my.dto.response.MyProfileUpdateResponseDto;
import com.forpets.be.domain.user.repository.UserRepository;
import com.forpets.be.global.aws.S3Service;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MyService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final S3Service s3Service;

    // 나의 프로필(회원정보) 조회
    public MyProfileResponseDto getMyProfile(User user) {
        User me = userRepository.findByUsername(user.getUsername())
            .orElseThrow(() -> new RuntimeException("User not found"));

        return MyProfileResponseDto.from(me);
    }

    // 마이페이지 회원정보 수정 시 비밀번호 검증
    public UserCheckResponseDto checkPassword(UserPasswordRequestRecord requestRecord, User user) {
        // DB에 있는 비밀번호는 해싱되어 있으므로 matches 메서드를 통해 일치 여부를 확인
        boolean isMatched = passwordEncoder.matches(requestRecord.password(), user.getPassword());

        String message = isMatched ? "비밀번호가 확인되었습니다." : "입력하신 비밀번호가 일치하지 않습니다.";

        return new UserCheckResponseDto(message, isMatched);
    }

    // 마이페이지 회원정보 수정
    @Transactional
    public MyProfileUpdateResponseDto updateUserInfo(MyProfileUpdateRequestDto requestDto,
        MultipartFile file, User user) {
        // 회원정보를 수정할 사용자 조회
        User me = userRepository.findById(user.getId())
            .orElseThrow(() -> new IllegalArgumentException("해당 사용자를 찾을 수 없습니다."));

        // 사용자가 비밀번호를 수정하려고 입력했을 경우, 입력한 비밀번호에 대해 해싱 진행
        String encodedPassword = null;
        String newNickname = null;
        Map<String, String> uploadResult = null;
        String imageUrl = null;
        String s3Key = null;

        // 닉네임, 비밀번호가 null이 아닌 경우
        if (requestDto != null) {
            newNickname = requestDto.getNickname();

            // 사용자가 입력한 새로운 닉네임이 이미 존재하는지 검증
//            if (newNickname != null && userRepository.existsByNickname(newNickname)) {
//                throw new IllegalArgumentException("해당 닉네임이 이미 존재합니다.");
//            }

            String newPassword = requestDto.getPassword();

            if (newPassword != null && !newPassword.isBlank()) {
                // 사용자가 입력한 새로운 비밀번호와 기존 비밀번호가 동일한지 검증
                if (passwordEncoder.matches(newPassword, user.getPassword())) {
                    throw new IllegalArgumentException("동일한 비밀번호로 변경할 수 없습니다.");
                }

                encodedPassword = passwordEncoder.encode(newPassword);
            }
        }

        // 사용자가 이미지 파일도 수정을 요청한 경우
        if (file != null) {
            if (me.getImageUrl() == null || me.getImageUrl().isEmpty()) {
                // 기존에 사용자 프로필 이미지가 없는 경우
                // AWS S3에 파일 업로드하고 접근 가능한 객체 URL과 객체 키를 반환
                uploadResult = s3Service.uploadFile(file);
                imageUrl = uploadResult.get("imageUrl");
                s3Key = uploadResult.get("s3Key");
            } else {
                // 기존에 사용자 프로필 이미지가 있는 경우
                // 기존 AWS S3에 들어있던 이미지 삭제
                s3Service.deleteFile(me.getS3Key());

                // AWS S3에 파일 업로드하고 접근 가능한 객체 URL과 객체 키를 반환
                uploadResult = s3Service.uploadFile(file);
                imageUrl = uploadResult.get("imageUrl");
                s3Key = uploadResult.get("s3Key");
            }
        }
        // 회원정보 업데이트
        me.update((encodedPassword != null && !encodedPassword.isBlank()) ? encodedPassword
                : me.getPassword(), newNickname, file,
            imageUrl, s3Key);

        return MyProfileUpdateResponseDto.from(me, imageUrl != null ? imageUrl : me.getImageUrl());
    }
}
