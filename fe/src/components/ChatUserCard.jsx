import React from 'react';

function ChatUserCard() {
  return (
    <li className="w-[100%] flex items-center gap-5 p-3 border rounded-md box-border bg-[#ffffff]">
      <div className="w-[100px] h-[100px] ">
        <img className="w-[100px] h-[100px]" src="assets/logo.png" alt="사용자 이미지" />
      </div>
      <ul className="flex flex-col gap-3">
        <li className="font-bold">쮸니</li>
        <li className="text-sm">서울시 중랑구 -&gt; 서울시 노원구</li>
      </ul>
    </li>
  );
}

export default ChatUserCard;
