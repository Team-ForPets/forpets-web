import React, { useEffect, useState } from 'react';
import VolunteerWorkStatusApi from '../api/volunteerWorkStatusApi';
function PromiseModal({
  requestorId,
  setModalOpen,
  myAnimal,
  chatRoomData,
  setContent,
  setPromiseStatus,
}) {
  // chatRoomData에서 봉사자 ID 가져오기
  useEffect(() => {}, [chatRoomData, requestorId, myAnimal.id]);

  const handleSubmit = async () => {
    const myVolunteer = chatRoomData.chatMessages.find(
      (volunteer) => volunteer.senderId !== requestorId,
    );
    const volunteerId = myVolunteer?.senderId || null;

    const requestData = {
      requestorId: requestorId,
      volunteerId: volunteerId,
      myAnimalId: myAnimal.id,
    };

    const response = await VolunteerWorkStatusApi.createVolunteerWorkStatus(requestData);
    
    setModalOpen(false);
    setContent('약속잡기 완료!');
    setPromiseStatus(true);
  };

  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
  bg-gray-100 text-black p-6 rounded-xl shadow-gray-300 shadow-lg z-10 w-[25vw] h-[30vh]"
    >
      <section className="flex flex-col justify-center items-center h-full">
        <p className="text-[22px] font-semibold mb-8">정말로 약속을 잡으시겠습니까?</p>
      </section>
      <section className="absolute bottom-4 right-4 flex space-x-4">
        <button
          className="px-4 py-2 bg-gray-300 text-white rounded-xl hover:bg-gray-400"
          onClick={() => setModalOpen(false)}
        >
          취소
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-hover"
        >
          확인
        </button>
      </section>
    </div>
  );
}

export default PromiseModal;
