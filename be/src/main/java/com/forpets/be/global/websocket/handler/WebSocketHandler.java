package com.forpets.be.global.websocket.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashSet;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper;

    // 웹소켓 세션을 저장할 Set
    private final Set<WebSocketSession> sessions = new HashSet<>();

    // 웹소켓 연결 확인
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        log.info("{} 연결됨", session.getId());
        sessions.add(session);
        session.sendMessage(new TextMessage("WebSocket 연결 완료"));
    }

    // 웹소켓 메시지 처리
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message)
        throws Exception {
        String payload = message.getPayload();
        log.info("payload {}", payload);

        for (WebSocketSession s : sessions) {
            s.sendMessage(new TextMessage(payload));
        }
    }

    // 웹소켓 연결 종료
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status)
        throws Exception {
        log.info("{} 연결 끊김", session.getId());
        sessions.remove(session);
        session.sendMessage(new TextMessage("WebSocket 연결 종료"));
    }
}