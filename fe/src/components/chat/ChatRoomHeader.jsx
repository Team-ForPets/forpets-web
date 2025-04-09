import React, { useEffect, useState } from 'react';
import PromiseModal from './PromiseModal';
import PromiseStatusModal from '../PromiseStatusModal';
import VolunteerWorkStatusApi from '../../api/volunteerWorkStatusApi';
function ChatRoomHeader({
  chatRoomStatus,
  chatRoomData,
  myAnimal,
  handleAnimalModal,
  requestorId,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [content, setContent] = useState('');
  const [promiseStatus, setPromiseStatus] = useState(null);
  const [volunteerStatusId, setVolunteerStatusId] = useState();
  const [actionType, setActionType] = useState(null); // 'CANCEL' or 'COMPLETE' or 'CREATE'

  useEffect(() => {
    fetchVolunteerWorkStatus();
  }, [chatRoomData.chatRoomId]);

  const fetchVolunteerWorkStatus = async () => {
    const response = await VolunteerWorkStatusApi.getMyVolunteerWorkStatus();
    const statuses = response.data.data.volunteerWorkStatuses;

    // 현재 채팅방의 상태만 가져오기
    const currentStatus = statuses.find((item) => item.chatRoomId === chatRoomData.chatRoomId);
    setPromiseStatus(currentStatus?.status || null); // 없으면 null
    statuses.map((item) => {
      setVolunteerStatusId(item.id);
    });
  };

  return (
    <div className="h-[10%] flex justify-between items-center rounded-t-md bg-white">
      <div className="w-[80%] flex gap-3 items-center justify-start">
        <div className="w-[100px] box-border">
          <img
            src="assets/forpets-logo.png"
            alt="이미지"
            className="w-[100px] h-[50px] p-2 box-border"
          />
        </div>
        {/* 요청일 경우 */}2
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
          className="py-0.5 px-2 text-xs bg-[#FFC28D] rounded-md mt-auto mb-0.5 mr cursor-pointer"
        >
          아이정보
        </button>
      </div>

      {/* 약속 버튼 */}
      <div className="w-[25%] text-center flex gap-1 justify-end mr-2">
        {promiseStatus === null ? (
          <button
            onClick={() => {
              setActionType('CREATE');
              setModalOpen(true);
            }}
            className=" p-2 text-white bg-[#FF983F] rounded-md cursor-pointer"
          >
            약속잡기
          </button>
        ) : promiseStatus === 'IN_PROGRESS' ? (
          <>
            <button
              onClick={() => {
                setActionType('CANCEL');
                setModalOpen(true);
              }}
              className="p-2 text-white bg-[#FF983F] rounded-md cursor-pointer"
            >
              약속취소
            </button>
            <button
              onClick={() => {
                setActionType('COMPLETE');
                setModalOpen(true);
              }}
              className="p-2 text-white bg-[#FF983F] rounded-md cursor-pointer"
            >
              이동완료
            </button>
          </>
        ) : (
          '이동 완료된 채팅입니다'
        )}
      </div>
      {modalOpen && (
        <PromiseModal
          actionType={actionType}
          requestorId={requestorId}
          setModalOpen={setModalOpen}
          myAnimal={myAnimal}
          chatRoomData={chatRoomData}
          setContent={setContent}
          promiseStatus={promiseStatus}
          setPromiseStatus={setPromiseStatus}
          volunteerStatusId={volunteerStatusId}
          fetchVolunteerWorkStatus={fetchVolunteerWorkStatus}
        />
      )}
      <PromiseStatusModal content={content}></PromiseStatusModal>
    </div>
  );
}

export default ChatRoomHeader;
