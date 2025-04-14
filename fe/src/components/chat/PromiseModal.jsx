import React, { useEffect, useState } from 'react';
import VolunteerWorkStatusApi from '../../api/volunteerWorkStatusApi';
function PromiseModal({
  actionType,
  setModalOpen,
  myAnimal,
  chatRoomData,
  setContent,
  promiseStatus,
  setPromiseStatus,
  volunteerStatusId,
  fetchVolunteerWorkStatus,
}) {
  console.log(chatRoomData);
  const handleSubmit = async () => {
    if (actionType === 'CANCEL') {
      await VolunteerWorkStatusApi.deleteVolunteerWorkStatus(volunteerStatusId);
      setContent('약속이 취소되었습니다.');
      setPromiseStatus(null);
    } else if (actionType === 'COMPLETED') {
      await VolunteerWorkStatusApi.completeVolunteerWorkStatus(volunteerStatusId);
      setContent('이동이 완료되었습니다.');
      setPromiseStatus('COMPLETED');
    } else if (actionType === 'CREATE') {
      const requestData = {
        chatRoomId: chatRoomData.id,
        requestorId: chatRoomData.requestorId,
        volunteerId: chatRoomData.volunteerId,
        myAnimalId: myAnimal.id,
      };
      await VolunteerWorkStatusApi.createVolunteerWorkStatus(requestData);
      setContent('약속잡기 완료!');
      setPromiseStatus('IN_PROGRESS');
    }

    fetchVolunteerWorkStatus();
    setModalOpen(false);
  };

  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
  bg-gray-100 text-black p-6 rounded-xl shadow-gray-300 shadow-lg z-10 w-[25vw] h-[30vh]"
    >
      <section className="flex flex-col justify-center items-center h-full">
        <p className="text-[22px] font-semibold mb-8">
          {actionType === 'CANCEL'
            ? '정말로 약속을 취소하시겠습니까?'
            : actionType === 'COMPLETE'
              ? '정말로 이동을 완료하시겠습니까?'
              : '정말로 약속을 잡으시겠습니까?'}
        </p>
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
