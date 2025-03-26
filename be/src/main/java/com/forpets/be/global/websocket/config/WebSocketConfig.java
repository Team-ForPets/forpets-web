package com.forpets.be.global.websocket.config;

import com.forpets.be.global.websocket.handler.WebSocketHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
// 웹소켓 서버를 사용하도록 정의
@EnableWebSocket
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketConfigurer {

    private final WebSocketHandler webSocketHandler;

    @Value("${cors.allowed-origin}")
    private String allowedOrigin;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        // 웹소켓 서버의 엔드포인트를 설정
        // 웹소켓 서버에 요청 시 포페츠 도메인과 로컬 접속 요청을 허용하도록 설정 (CORS)
        registry
            .addHandler(webSocketHandler, "/ws/conn")
            .setAllowedOrigins("http://localhost:5173", allowedOrigin);
    }
}
