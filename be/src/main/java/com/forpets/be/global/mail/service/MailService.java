package com.forpets.be.global.mail.service;


import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender mailSender;

    public void sendAuthCodeToEmail(String email, String code) {
        MimeMessage msg = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(msg, false);
            helper.setTo(email);
            helper.setSubject("forpets 인증 코드입니다.");
            helper.setText("인증 코드" + code, false); // true : html 형식으로 전달 할 수 있다고 함
            mailSender.send(msg);

        } catch (MessagingException e) {
            throw new RuntimeException("이메일 전송 실패", e);
        }
    }
}
