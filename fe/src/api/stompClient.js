import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

// WebSocket 연결을 위한 SockJS 생성 함수
export function socketProvider() {
  return new SockJS('http://localhost:8080/ws'); // 백엔드 WebSocket 엔드포인트
}

// STOMP 클라이언트 생성
export const stompClient = new Client({
  webSocketFactory: socketProvider, // SockJS 사용
  connectHeaders: {
    login: 'guest',
    passcode: 'guest',
  },
  debug: (msg) => console.log(msg), // 디버깅 로그
  reconnectDelay: 5000, // 자동 재연결 (5초 후)
});

// STOMP 연결 및 이벤트 처리
export function connectStomp(callback) {
  stompClient.onConnect = () => {
    console.log('✅ STOMP 연결 성공');

    // 특정 채널을 구독
    stompClient.subscribe('/topic/messages', (message) => {
      console.log('📩 받은 메시지:', message.body);
      callback(message.body); // 콜백 함수로 메시지 전달
    });

    // 예제: 서버로 메시지 전송
    stompClient.publish({ destination: '/app/send', body: 'Hello STOMP!' });
  };

  stompClient.onDisconnect = () => {
    console.log('❌ STOMP 연결 종료');
  };

  stompClient.activate(); // 연결 시작
}
