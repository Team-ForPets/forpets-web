import React from 'react';

function ChatUserCard({ chatRoom, activeBtn, onClick }) {
  const { departureArea, arrivalArea, createdAt, requestorNickname, volunteerNickname } = chatRoom;

  return (
    <li
      className="w-[100%] flex items-center gap-5 p-3 border rounded-md box-border bg-[#ffffff] cursor-pointer"
      onClick={onClick} // ✅ 클릭 이벤트 연결
    >
      <div className="w-[100px] h-[100px]">
        <img className="w-[100px] h-[100px]" src="assets/logo.png" alt="사용자 이미지" />
      </div>
      <ul className="flex flex-col gap-3">
        <li className="font-bold">
          {activeBtn === '요청'
            ? `봉사자 이름: ${volunteerNickname}`
            : `요청자 이름: ${requestorNickname}`}
        </li>
        <li className="font-sm">방 생성시간 {createdAt}</li>
        <li className="font-sm">출발지: {departureArea}</li>
        <li className="text-sm">도착지: {arrivalArea}</li>
      </ul>
    </li>
  );
}

export default ChatUserCard;
