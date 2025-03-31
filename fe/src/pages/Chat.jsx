import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ChatUserCard from '../components/chat/ChatUserCard';
import animalsApi from '../api/animalsApi';
import volunteerApi from '../api/volunteerApi';
import chatApi from '../api/chatApi';
import AnimalInfoModal from '../components/AnimalInfoModal';
import ChatRoomList from '../components/chat/ChatRoomList';
import ChatRoomHeader from '../components/chat/ChatRoomHeader';
import ChatMessages from '../components/chat/ChatMessages';

function Chat() {
  const requestorId = useSelector((state) => state.auth.user.id); // userId 가져오기
  const [activeBtn, setActiveBtn] = useState('요청');
  const [requestChatRoom, setRequestChatRoom] = useState([]);
  const [volunteerChatRoom, setVolunteerChatRoom] = useState([]);
  const [chatRoomData, setChatRoomData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [myAnimal, setMyAnimal] = useState();
  const [volunteerId, setVolunteerId] = useState(4);

  // 요청 봉사자 탭
  const handleButtonClick = (buttonName) => {
    setActiveBtn(buttonName);
    buttonName === '요청' ? getMyAnimalsChatRooms() : getMyVolunteerChatRooms();
  };

  // 내가 요청자로 속한 채팅방 전체 조회 API
  const getMyAnimalsChatRooms = async () => {
    try {
      const response = await chatApi.getMyRequestRooms(requestorId);
      const data = response.data.chatRooms;
      setRequestChatRoom(data);
    } catch (e) {
      console.error(e.response);
    }
  };

  // 내가 봉사자로 속한 채팅방 전체 조회
  const getMyVolunteerChatRooms = async () => {
    try {
      const response = await chatApi.getMyVolunteerRooms(volunteerId);
      const data = response.data.chatRooms;
      setVolunteerChatRoom(data);
    } catch (e) {
      console.error(e.response);
    }
  };

  // 채팅방 상세 정보 조회 (메세지 조회)
  const handleChatRoomClick = async (id) => {
    try {
      const response = await chatApi.getChatRoomDetail(id);
      setChatRoomData(response.data);
      const animalData = response.data.myAnimal;
      setMyAnimal(animalData);
    } catch (error) {
      console.error('Failed to fetch chat room details', error);
    }
  };

  // 아이정보 상세 보기
  const handleAnimalModal = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    getMyAnimalsChatRooms();
  }, []);

  return (
    <main className="h-[90vh] pb-[10%] flex justify-between">
      {/* 요청, 봉사자 목록 */}
      <ChatRoomList
        activeBtn={activeBtn}
        requestChatRoom={requestChatRoom}
        volunteerChatRoom={volunteerChatRoom}
        handleButtonClick={handleButtonClick}
        handleChatRoomClick={handleChatRoomClick}
      />

      {/* 채팅창 */}
      <section className="w-[69%] h-full relative rounded-md border">
        {!chatRoomData ? (
          <div className="h-full flex flex-col justify-center items-center text-gray-500">
            <h2 className="text-2xl font-bold mb-2">채팅방을 선택하세요</h2>
            <p className="text-sm">왼쪽 목록에서 채팅방을 선택하여 대화를 시작하세요.</p>
          </div>
        ) : (
          <>
            <ChatRoomHeader chatRoomData={chatRoomData} handleAnimalModal={handleAnimalModal} />
            <ChatMessages
              chatRoomData={chatRoomData} // ✅ chatRoomId 전달
              senderId={requestorId} // ✅ senderId 전달
              handleChatRoomClick={handleChatRoomClick}
            />
          </>
        )}
      </section>
      {showModal && <AnimalInfoModal myAnimal={myAnimal} onClose={handleAnimalModal} />}
    </main>
  );
}

export default Chat;
