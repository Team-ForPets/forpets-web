package com.forpets.be.global.aws;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
@RequiredArgsConstructor
public class S3Service {

    // S3에 저장되는 파일의 기본 경로
    private static final String FILE_PATH_PREFIX = "images/";
    // S3 URL 형식 (%s: 버킷명, 리전, 파일경로가 순서대로 들어감)
    private static final String IMAGE_URL_FORMAT = "https://%s.s3.%s.amazonaws.com/%s";
    // AWS S3 서비스와 상호작용하기 위한 클라이언트
    private final S3Client s3Client;
    // S3 버킷 이름
    @Value("${BUCKET_NAME}")
    private String bucketName;
    // AWS 리전
    @Value("${REGION}")
    private String region;

    /**
     * 파일을 S3에 업로드하고 URL과 객체 키를 반환한다.
     *
     * @param file 업로드할 MultipartFile 객체
     * @return Map (imageUrl, s3Key를 포함)
     */
    public Map<String, String> uploadFile(MultipartFile file) {
        // 파일 객체 키 생성
        String s3Key = FILE_PATH_PREFIX + UUID.randomUUID() + "_" + file.getOriginalFilename();

        // file을 s3Key 경로에 업로드
        uploadFileToS3(file, s3Key);

        // 접근 가능한 URL 생성
        String imageUrl = String.format(IMAGE_URL_FORMAT, bucketName, region, s3Key);

        // URL과 키를 Map으로 반환
        return Map.of(
            "imageUrl", imageUrl,
            "s3Key", s3Key
        );
    }

    /**
     * 파일을 S3 버킷에 업로드한다.
     *
     * @param file  업로드할 MultipartFile 객체
     * @param s3Key S3 객체 키
     * @throws RuntimeException 파일 업로드 실패 시 발생
     */
    private void uploadFileToS3(MultipartFile file, String s3Key) {
        try {
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(s3Key)
                .contentType(file.getContentType())
                .contentLength(file.getSize())
                .build();

            s3Client.putObject(putObjectRequest,
                RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
        } catch (IOException e) {
            throw new RuntimeException("파일 업로드 실패: " + e.getMessage());
        }
    }


    /**
     * S3 객체를 삭제한다.
     *
     * @param s3Key S3 파일 객체 키
     * @throws RuntimeException 파일 삭제 실패 시 발생
     */
    public void deleteFile(String s3Key) {
        try {
            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(s3Key)
                .build();
            s3Client.deleteObject(deleteObjectRequest);
        } catch (Exception e) {
            throw new RuntimeException("파일 삭제 실패: " + e.getMessage());
        }
    }

}
