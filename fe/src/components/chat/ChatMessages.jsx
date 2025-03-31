import React, { useState, useEffect } from 'react';
import { Stomp } from '@stomp/stompjs'; // `Stomp`를 직접 import
import SockJS from 'sockjs-client';

let stompClient = null;

function ChatMessages({ chatRoomData, senderId, handleChatRoomClick }) {
  const { id, chatMessages } = chatRoomData;
  const [inputValue, setInputValue] = useState('');
  const chatMessage = {
    senderId: senderId,
    content: inputValue,
  };

  // 페이지 진입시 웹소켓 연결
  useEffect(() => {
    // 컴포넌트가 마운트되었을 때 WebSocket 연결을 설정
    connect();

    // 컴포넌트가 언마운트되었을 때 WebSocket 연결을 끊음
    return () => {
      disconnect();
    };
  }, [id]);
  const connect = () => {
    // WebSocket 서버에 연결
    const socket = new SockJS('http://localhost:8080/ws/connection');
    // `Stomp.over`로 WebSocket 연결
    stompClient = Stomp.over(socket, {
      reconnectDelay: 5000, // 5초마다 재연결 시도
      debug: (str) => {
        console.log(str);
      }, // 디버그 메시지
    });

    // WebSocket 연결 시 처리
    stompClient.connect(
      {},
      () => {
        console.log('웹소켓 연결 완료');

        // 채팅방 구독
        stompClient.subscribe(`/sub/chat/rooms/${id}`, (message) => {
          try {
            onMessageReceived(message.body); // onMessageReceived는 이미 파싱된 메시지를 받음
          } catch (error) {
            console.log('받은 원본 메시지:', message.body); // 원본 메시지 출력
          }
        });
      },
      (error) => {
        console.error('웹소켓 연결 실패:', error);
      },
    );
  };

  // 웹소켓 연결 종료
  const disconnect = () => {
    if (stompClient) {
      stompClient.disconnect(() => {
        console.log('웹소켓 연결 종료');
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleChatRoomClick();
    // WebSocket 연결이 되어 있지 않으면 오류 메시지 출력
    if (!stompClient || !stompClient.connected) {
      console.error('WebSocket 연결이 안되었습니다.');
      return;
    }

    // 메시지가 비어 있으면 오류 메시지 출력
    if (!inputValue.trim()) {
      console.error('메시지가 비어있습니다.');
      return;
    }

    // 서버로 메시지 전송
    stompClient.send(`/pub/chat/rooms/${id}/message`, {}, JSON.stringify(chatMessage));

    // 채팅방 데이터를 새로 고침
    handleChatRoomClick(id);

    // 메시지 전송 후 입력란 비우기
    setInputValue('');
  };
  return (
    <>
      <div className="h-[80%] bg-[#F5F5F5] flex flex-col-reverse overflow-auto">
        <div className="flex flex-col p-2">
          {chatMessages.map((message, index) => (
            <div
              key={index}
              className={`flex  mb-2 ${message.senderId !== senderId ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-2 rounded-lg ${
                  message.senderId !== senderId ? 'bg-[#FF983F] text-white' : 'bg-[#E3E3E3]'
                }`}
              >
                <p>{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full h-[10%] px-2 bg-[#FFC28D] rounded-md absolute bottom-0">
        <form className="h-[100%] flex justify-around items-center" onSubmit={handleSubmit}>
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
