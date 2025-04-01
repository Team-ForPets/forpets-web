import React, { useEffect, useState } from 'react';
import VolunteerWorkStatusApi from '../api/volunteerWorkStatusApi';
function PromiseModal({ requestorId, setModalOpen, myAnimal, chatRoomData }) {
  const [requestData, setRequestData] = useState(null);

  // chatRoomData에서 봉사자 ID 가져오기
  useEffect(() => {
    const myVolunteer = chatRoomData.chatMessages.find(
      (volunteer) => volunteer.senderId !== requestorId,
    );
    const volunteerId = myVolunteer?.senderId || null;

    setRequestData({
      requestorId: requestorId,
      volunteerId: volunteerId,
      myAnimalId: myAnimal.id,
    });
  }, [chatRoomData, requestorId, myAnimal.id]);

  console.log('requestData:', requestData);

  const handleSubmit = async () => {
    if (!requestData?.volunteerId) {
      console.error('봉사자 ID가 설정되지 않았습니다.');
      return;
    }
    const response = await VolunteerWorkStatusApi.createVolunteerWorkStatus(requestData);
    console.log(response);
    setModalOpen(false);
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
