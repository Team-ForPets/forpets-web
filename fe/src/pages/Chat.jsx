import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ChatUserCard from '../components/ChatUserCard';
import animalsApi from '../api/animalsApi';
import volunteerApi from '../api/volunteerApi';
import chatApi from '../api/chatApi';
import AnimalInfoModal from '../components/AnimalInfoModal';
function Chat() {
  const requestorId = useSelector((state) => state.auth.user.id); // userId 가져오기
  const [activeBtn, setActiveBtn] = useState('요청');
  const [requestChatRoom, setRequestChatRoom] = useState([]);
  const [volunteerChatRoom, setVolunteerChatRoom] = useState([]);
  const [chatRoomData, setChatRoomData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [myAnimal, setMyAnimal] = useState();

  const [formData, setFormData] = useState({ myAnimalId: 2 });
  const [volunteerId, setVolunteerId] = useState(1);
  const [messages, setMessages] = useState([
    { sender: 'other', text: '오전 12시 출발예정이에요' },
    { sender: 'me', text: '가능하신 시간대가 언제실까요?' },
    { sender: 'other', text: '안녕하세요!' },
    { sender: 'me', text: '봉사글 확인 후 채팅 드렸습니다.' },
    { sender: 'me', text: '안녕하세요!' },
  ]);

  // 요청 봉사자 텝
  const handleButtonClick = (buttonName) => {
    setActiveBtn(buttonName);
    // 버튼에 따라 호출할 API 다르게 설정
    buttonName === '요청' ? getMyAnimalsChatRooms() : getMyVolunteerChatRooms();
  };

  // 채팅방 만들기
  const handleCreateChatRoom = async () => {
    try {
      const response = await chatApi.createChatRoom(formData);
      console.log(response);
    } catch (e) {
      console.error(e.response);
    }
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

  // 채팅방 상세 정보 조회
  const handleChatRoomClick = async (id) => {
    try {
      const response = await chatApi.getChatRoomDetail(id);
      setChatRoomData(response.data);
      console.log(response.data);
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
      <button onClick={handleCreateChatRoom}>채팅방 만들기</button>
      {/* 요청,봉사자 목록 */}
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
                /> // 요청자 데이터 전달
              ))
            : volunteerChatRoom.map((chatRoom) => (
                <ChatUserCard
                  key={chatRoom.id}
                  chatRoom={chatRoom}
                  activeBtn={activeBtn}
                  onClick={() => handleChatRoomClick(chatRoom.id)}
                /> // 봉사자 데이터 전달
              ))}
        </ul>
      </section>

      {/* 채팅창 */}
      <section className="w-[69%] h-full relative rounded-md border">
        {/* 채팅방 미선택 시 안내 메시지 */}
        {!chatRoomData ? (
          <div className="h-full flex flex-col justify-center items-center text-gray-500">
            <h2 className="text-2xl font-bold mb-2">채팅방을 선택하세요</h2>
            <p className="text-sm">왼쪽 목록에서 채팅방을 선택하여 대화를 시작하세요.</p>
          </div>
        ) : (
          <>
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
                    {chatRoomData.departureArea} -&gt; {chatRoomData?.arrivalArea}
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
                <button className="p-2 text-white bg-[#FF983F] rounded-md cursor-pointer">
                  약속잡기
                </button>
              </div>
            </div>

            <div className="h-[80%] bg-[#F5F5F5] flex flex-col-reverse overflow-auto">
              <div className="flex flex-col p-2">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.sender === 'me' ? 'justify-end' : 'justify-start'
                    } mb-2`}
                  >
                    <div
                      className={`max-w-[70%] p-2 rounded-lg ${
                        message.sender === 'me' ? 'bg-[#FF983F] text-white' : 'bg-[#E3E3E3]'
                      }`}
                    >
                      <p>{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full h-[10%] px-2 flex justify-around items-center bg-[#FFC28D] rounded-md absolute bottom-0">
              <input type="text" className="w-[100%] h-[70%] bg-white rounded-xl" />
              <div className="h-[70%] ml-2 text-center">
                <button className="w-[100%] h-[100%] px-3 text-white bg-[#FF983F] rounded-full cursor-pointer box-border whitespace-nowrap">
                  전달
                </button>
              </div>
            </div>
          </>
        )}
      </section>
      {showModal && <AnimalInfoModal myAnimal={myAnimal} onClose={handleAnimalModal} />}
    </main>
  );
}

export default Chat;
