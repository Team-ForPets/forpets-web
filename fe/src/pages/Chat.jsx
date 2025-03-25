import React, { useState } from 'react';
import ChatUserCard from '../components/ChatUserCard';

function Chat() {
  const [activeBtn, setActiveBtn] = useState('요청');
  const [messages, setMessages] = useState([
    { sender: 'other', text: '오전 12시 출발예정이에요' },
    { sender: 'me', text: '가능하신 시간대가 언제실까요?' },
    { sender: 'other', text: '안녕하세요!' },
    { sender: 'me', text: '봉사글 확인 후 채팅 드렸습니다.' },
    { sender: 'me', text: '안녕하세요!' },
  ]);

  const handleButtonClick = (buttonName) => {
    setActiveBtn(buttonName);
  };

  return (
    <main className="h-[90vh] pb-[10%] flex justify-between">
      {/* 요청,봉사자 목록 */}
      <section className="w-[30%] h-full flex flex-col bg-[#F5F5F5] border rounded-md">
        <div className="flex rounded-md">
          <button
            className={`w-[50%] px-[1px] py-[5px] rounded-tl-[5px] transition-all duration-300 ${
              activeBtn === '요청' ? 'text-white bg-[#FF983F] font-bold' : 'bg-[#FFC28D]'
            }`}
            onClick={() => handleButtonClick('요청')}
          >
            요청
          </button>

          <button
            className={`w-[50%] px-[1px] py-[5px] rounded-tr-[5px] transition-all duration-300 ${
              activeBtn === '봉사' ? 'text-white bg-[#FF983F] font-bold' : ' bg-[#FFC28D]'
            }`}
            onClick={() => handleButtonClick('봉사')}
          >
            봉사
          </button>
        </div>
        <ul className="h-full flex flex-col items-center gap-1 p-1 overflow-auto">
          <ChatUserCard />
          <ChatUserCard />
          <ChatUserCard />
          <ChatUserCard />
          <ChatUserCard />
          <ChatUserCard />
        </ul>
      </section>

      {/* 채팅창 */}
      <section className="w-[69%] h-full relative rounded-md border">
        <div className="h-[10%] flex justify-between items-center rounded-t-md bg-white">
          <div className="w-[80%] flex gap-3 items-center justify-start">
            <div className="w-[100px] box-border">
              <img
                src="assets/forpets-logopng.png"
                alt="이미지"
                className="w-[100px] h-[50px] p-2 box-border"
              />
            </div>
            <div>
              <h3 className="font-black">봉사자 이름</h3>
              <p className="text-xs">서울 도봉구 -&gt; 서초구</p>
            </div>
            <button className="py-0.5 px-2 text-xs bg-[#FFC28D] rounded-md mt-auto mb-0.5 cursor-pointer">
              아이정보
            </button>
          </div>

          <div className="w-[20%] text-center">
            <button className="p-2 text-white bg-[#FF983F] rounded-md cursor-pointer">
              약속잡기
            </button>
          </div>
        </div>

        <div className="h-[80%] bg-[#F5F5F5] flex flex-col-reverse overflow-auto">
          <div className="flex flex-col p-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} mb-2`}
              >
                <div
                  className={`max-w-[70%] p-2 rounded-lg ${
                    message.sender === 'me' ? 'bg-[#FF983F] text-white' : 'bg-[#E3E3E3]'
                  }`}
                >
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-[10%] px-2 flex justify-around items-center bg-[#FFC28D] rounded-md absolute bottom-0">
          <input type="text" className="w-[100%] h-[70%] bg-white rounded-xl" />
          <div className="h-[70%] ml-2 text-center">
            <button className="w-[100%] h-[100%] px-3 text-white bg-[#FF983F] rounded-full cursor-pointer box-border whitespace-nowrap">
              전달
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Chat;
