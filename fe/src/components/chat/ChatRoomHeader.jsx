import React from 'react';

function ChatRoomHeader({ chatRoomData, handleAnimalModal }) {
  console.log(chatRoomData);

  return (
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
          <h3 className="font-black">{chatRoomData?.nickName}</h3>
          <p className="text-xs">
            {chatRoomData.arrivalArea} -&gt; {chatRoomData?.departureArea}
          </p>
        </div>
        <button
          onClick={handleAnimalModal}
          className="py-0.5 px-2 text-xs bg-[#FFC28D] rounded-md mt-auto mb-0.5 cursor-pointer"
        >
          아이정보
        </button>
      </div>

      <div className="w-[20%] text-center">
        <button className="p-2 text-white bg-[#FF983F] rounded-md cursor-pointer">약속잡기</button>
      </div>
    </div>
  );
}

export default ChatRoomHeader;
