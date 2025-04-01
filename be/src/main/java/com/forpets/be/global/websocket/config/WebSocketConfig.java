package com.forpets.be.global.websocket.config;

import com.forpets.be.global.websocket.handler.StompHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
// 웹소켓 서버를 사용하도록 정의
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final StompHandler stompHandler;
    @Value("${global.allowed-origin}")
    private String allowedOrigin;

    public WebSocketConfig(StompHandler stompHandler) {
        this.stompHandler = stompHandler;
    }

    // 클라이언트가 연결할 엔드포인트 설정
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry
            // 웹소켓 연결 엔드포인트 설정
            .addEndpoint("/ws/connection")
            // 웹소켓 서버에 요청 시 포페츠 도메인과 로컬 접속 요청을 허용하도록 설정 (CORS)
            .setAllowedOrigins("http://localhost:5173", allowedOrigin)
            // 소켓을 지원하지 않는 브라우저일 경우 sock JS를 사용하도록 설정
            .withSockJS();
    }

    // STOMP 메시지 브로커 설정
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 클라이언트에게 메시지를 전달할 메시지 브로커 경로 설정 (topic)
        registry.enableSimpleBroker("/sub");

        // 클라이언트가 메시지를 보낼 경로 설정 (app)
        registry.setApplicationDestinationPrefixes("/pub");
    }

    // STOMP 요청 시 Spring 서버 콘솔 로그에서 표시
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(stompHandler);
    }
}
