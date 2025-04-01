import React, { useState } from 'react';
import PromiseModal from '../PromiseModal';

function ChatRoomHeader({
  chatRoomStatus,
  chatRoomData,
  myAnimal,
  handleAnimalModal,
  requestorId,
}) {
  const [modalOpen, setModalOpen] = useState(false);

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

        {/* 요청일 경우 */}
        {chatRoomStatus === '봉사' ? (
          <div>
            <h3 className="font-black">{myAnimal?.nickName}</h3>
            <p className="text-xs">
              {myAnimal?.departureArea} -&gt; {myAnimal?.arrivalArea}
            </p>
          </div>
        ) : (
          //  봉사일 경우
          <div>
            <h3 className="font-black">{chatRoomData?.volunteerNickName}</h3>{' '}
            <p className="text-xs">
              {chatRoomData?.departureArea} -&gt; {chatRoomData?.arrivalArea}
            </p>
          </div>
        )}

        <button
          onClick={handleAnimalModal}
          className="py-0.5 px-2 text-xs bg-[#FFC28D] rounded-md mt-auto mb-0.5 cursor-pointer"
        >
          아이정보
        </button>
      </div>

      <div className="w-[20%] text-center">
        <button
          onClick={() => setModalOpen(true)}
          className="p-2 text-white bg-[#FF983F] rounded-md cursor-pointer"
        >
          약속잡기
        </button>
      </div>
      {modalOpen && (
        <PromiseModal
          requestorId={requestorId}
          setModalOpen={setModalOpen}
          myAnimal={myAnimal}
          chatRoomData={chatRoomData}
        />
      )}
    </div>
  );
}

export default ChatRoomHeader;
