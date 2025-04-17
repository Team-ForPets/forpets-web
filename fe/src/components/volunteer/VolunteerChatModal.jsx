import React, { useEffect, useState } from 'react';
import mypageApi from '../../api/mypageApi';
import chatApi from '../../api/chatApi';
import { useNavigate } from 'react-router-dom';

function VolunteerChatModal({ volunteerWorkId, handleCloseModal }) {
  const [animals, setAnimals] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null); // 클릭된 동물의 인덱스를 관리
  const [myAnimalId, setMyAnimalId] = useState(null); // 클릭된 동물의 고유id 관리
  const navigate = useNavigate();

  // 내아이디가 가지고있는 나의아이 조회
  const fetchMyAnimals = async () => {
    const response = await mypageApi.getMyAnimals();
    const data = response.data.animals;
    setAnimals(data);
  };

  useEffect(() => {
    fetchMyAnimals();
  }, []);

  const handleWheelScroll = (e) => {
    if (e.deltaY > 0) {
      // Scroll to the right
      e.target.scrollLeft += 100;
    } else {
      // Scroll to the left
      e.target.scrollLeft -= 100;
    }
  };

  const handleDragStart = (e) => {
    e.preventDefault();
    e.target.style.cursor = 'grabbing';
    e.target.dataset.dragging = 'true';
    e.target.dataset.startX = e.clientX;
    e.target.dataset.scrollLeft = e.scrollLeft;
  };

  const handleDragMove = (e) => {
    const element = e.target;
    if (element.dataset.dragging === 'true') {
      const x = e.clientX;
      const walk = (x - parseInt(element.dataset.startX)) * 2;
      element.scrollLeft = parseInt(element.dataset.scrollLeft) - walk;
    }
  };

  const handleDragEnd = (e) => {
    const element = e.target;
    element.style.cursor = 'grab';
    element.dataset.dragging = 'false';
  };

  // 클릭된 이미지 관리
  const handleActive = (index) => {
    setActiveIndex(index);
  };

  // 채팅방 생성
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = { myAnimalId: myAnimalId, volunteerWorkId };
    console.log(myAnimalId);
    console.log(volunteerWorkId);
    console.log(requestData);

    try {
      const response = await chatApi.createChatRoom(requestData);
      console.log(response);
      navigate('/chat');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl z-10">
        <form className="space-y-6 flex flex-col" onSubmit={handleSubmit}>
          <section
            className="flex overflow-x-auto space-x-4 pb-4"
            onWheel={handleWheelScroll}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
          >
            {animals.map((animal, index) => {
              const isActive = activeIndex === index; // 현재 클릭된 이미지 확인
              return (
                <article
                  key={animal.id}
                  className={`flex flex-shrink-0 flex-col ${isActive ? `bg-gray opacity-95` : ''}`}
                >
                  <div
                    className="h-[20vh] flex items-center"
                    onClick={() => {
                      setMyAnimalId(animal.id);
                      handleActive(index);
                    }}
                  >
                    {console.log(animal)}
                    <img
                      src={`${animal.imageUrl}`}
                      alt="나의 아이 사진"
                      className={`w-32 h-32 rounded-md ${isActive ? 'transform translate-y-[-1rem]   transition-all ' : ''}`} // 클릭된 이미지에만 크기 증가
                    />
                  </div>
                  <div className="text-center mt-2">{animal.animalName}</div>
                </article>
              );
            })}
          </section>
          <section className="flex justify-center space-x-4">
            <button type="submit" className="bg-orange-500 text-white px-8 py-2 rounded w-32">
              선택
            </button>
            <button
              type="button"
              onClick={handleCloseModal}
              className="bg-gray-300 text-gray-700 px-8 py-2 rounded w-32"
            >
              취소
            </button>
          </section>
        </form>
      </div>
    </div>
  );
}

export default VolunteerChatModal;
