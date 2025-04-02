package com.forpets.be.domain.user.entity;

import com.forpets.be.global.entity.BaseTimeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Collection;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

@Entity
@Table(name = "user_repo")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseTimeEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String nickname;

    // S3 객체의 접근 URL
    // AWS S3 버킷 객체의 URL
    @Column(nullable = true)
    private String imageUrl;

    // S3 객체의 키(식별자)
    // 버킷 내 객체를 구분하기 위해 필요하다.
    // 객체 삭제에 활용되는 필드
    @Column(nullable = true)
    private String s3Key;

    // 업로드 파일의 원본 파일명
    // 화면 출력용
    @Column(nullable = true)
    private String originalFileName;

    // Role을 통해 사용자의 권한을 정의
    @Enumerated(EnumType.STRING)
    private Role role;

    private String snsProvider; // 어떤 OAuth인지(google, kakao, naver)

    @Builder
    public User(String username, String password, String nickname, String originalFileName,
        Role role, String imageUrl, String s3Key, String snsProvider) {
        this.username = username;
        this.password = password;
        this.nickname = nickname;
        this.role = role;
        this.originalFileName = originalFileName;
        this.imageUrl = imageUrl;
        this.s3Key = s3Key;
        this.snsProvider = snsProvider;
    }

    // 마이페이지 회원정보(프로필) 수정에서 회원정보 업데이트
    public User update(String encodedPassword, String newNickname, MultipartFile file,
        String imageUrl, String s3Key) {
        // 파일 처리
        if (file != null) {
            this.originalFileName = file.getOriginalFilename();
        }

        // 패스워드 업데이트 (null이 아닌 경우에만)
        if (encodedPassword != null) {
            this.password = encodedPassword;
        }

        // 닉네임 업데이트 (null이 아닌 경우에만)
        if (newNickname != null) {
            this.nickname = newNickname;
        }

        // 이미지 URL 업데이트 (필요한 경우에만)
        if (imageUrl != null) {
            this.imageUrl = imageUrl;
        }

        // S3 키 업데이트 (필요한 경우에만)
        if (s3Key != null) {
            this.s3Key = s3Key;
        }
        return this;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
