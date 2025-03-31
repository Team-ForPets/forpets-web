import React from 'react';
import ChatUserCard from './ChatUserCard';

function ChatRoomList({
  activeBtn,
  requestChatRoom,
  volunteerChatRoom,
  handleButtonClick,
  handleChatRoomClick,
}) {
  return (
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
        {activeBtn === '요청'
          ? requestChatRoom.map((chatRoom) => (
              <ChatUserCard
                key={chatRoom.id}
                chatRoom={chatRoom}
                activeBtn={activeBtn}
                onClick={() => handleChatRoomClick(chatRoom.id)}
              />
            ))
          : volunteerChatRoom.map((chatRoom) => (
              <ChatUserCard
                key={chatRoom.id}
                chatRoom={chatRoom}
                activeBtn={activeBtn}
                onClick={() => handleChatRoomClick(chatRoom.id)}
              />
            ))}
      </ul>
    </section>
  );
}

export default ChatRoomList;
