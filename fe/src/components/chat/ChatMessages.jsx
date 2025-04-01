import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

function ChatMessages({ chatRoomData }) {
  const accessToken = localStorage.getItem('accessToken');
  const userId = parseInt(localStorage.getItem('userId')); // userId 가져오기
  const { id, chatMessages } = chatRoomData;
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([...chatMessages]); // 채팅 메시지 상태
  const stompClientRef = useRef(null); // stompClient를 useRef로 저장

  const sendMessage = (e) => {
    e.preventDefault();

    // 빈 문자열이 아니면만 메시지를 전송
    if (!inputValue.trim()) return;

    const chatMessage = {
      senderId: userId,
      content: inputValue,
    };

    // 서버로 메시지 전송
    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.publish({
        destination: `/pub/chat/rooms/${id}/message`,
        body: JSON.stringify(chatMessage),
      });
    } else {
      console.error('❌ WebSocket 연결이 없습니다.');
    }

    setInputValue('');
  };

  useEffect(() => {
    // 메시지 상태 초기화 (방 변경 시마다 새로 고침)
    setMessages([...chatMessages]);

    const socket = new SockJS('http://localhost:8080/ws/connection');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      connectHeaders: {
        Authorization: accessToken, // 🔥 토큰을 포함하여 인증
        'accept-version': '1.1,1.2',
        host: 'localhost',
      },
      // debug: (msg) => console.log('[STOMP] ' + msg),
      onConnect: () => {
        console.log('✅ WebSocket 연결 성공!');

        // 채팅방 구독 (수신)
        stompClient.subscribe(`/sub/chat/rooms/${id}`, (message) => {
          const receivedMessage = JSON.parse(message.body); // 메시지가 문자열이라면 그대로 사용
          // 빈 메시지가 아닌 경우만 상태 업데이트
          if (receivedMessage.content.trim()) {
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                senderId: receivedMessage.senderId, // 보낸 사람 ID
                content: receivedMessage.content, // 받은 메시지 내용
              },
            ]);
          }
        });

        // 입장 메시지 전송
        stompClient.publish({
          destination: `/pub/chat/rooms/${id}/enter`,
          body: JSON.stringify({ senderId: userId }),
        });

        stompClient.onStompError = (frame) => {
          console.error('❌ STOMP 오류 발생:', frame);
        };
      },
      onStompError: (frame) => {
        console.error('❌ STOMP 오류 발생:', frame);
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient; // stompClient를 useRef에 저장

    return () => {
      stompClient.deactivate(); // 컴포넌트 언마운트 시 WebSocket 연결 해제
    };
  }, [id, userId]);

  return (
    <>
      <div className="h-[80%] bg-[#F5F5F5] flex flex-col-reverse overflow-auto">
        <div className="flex flex-col p-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex mb-2 ${message.senderId === userId ? 'justify-end' : 'justify-start'}`}
            >
              {/* {console.log(message)} */}

              <div
                className={`max-w-[70%] p-2 rounded-lg ${
                  message.senderId === userId ? 'bg-[#FF983F] text-white' : 'bg-[#E3E3E3]'
                }`}
              >
                <p>{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-[10%] px-2 bg-[#FFC28D] rounded-md absolute bottom-0">
        <form className="h-[100%] flex justify-around items-center" onSubmit={sendMessage}>
          <input
            type="text"
            className="w-[100%] h-[70%] bg-white rounded-xl"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="메시지를 입력하세요."
            autoFocus
          />
          <div className="h-[70%] ml-2 text-center">
            <button className="w-[100%] h-[100%] px-3 text-white bg-[#FF983F] rounded-full cursor-pointer box-border whitespace-nowrap">
              전달
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ChatMessages;
