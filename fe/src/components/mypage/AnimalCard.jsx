import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AnimalCard({ animal }) {
  const [image, setImage] = useState('');
  const [hovered, setHovered] = useState(false);

  const navigate = useNavigate();

  // 파일이 선택되었을 때 실행될 핸들러 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 이미지 삭제 버튼 클릭 시 실행
  const handleImageDelete = () => {
    setImage('');
  };

  const handleAnimalInfoEdit = () => {
    navigate(`/animal-detail/${animal.id}`);
  };

  return (
    <li>
      <section className="flex  justify-center  ">
        <article className="bg-white w-[95%] h-auto rounded-md self-center overflow-y-auto">
          {/* 상단 정보 */}
          <div className="flex gap-10 p-5 ">
            <div
              className="w-[40%] bg-gray-300 rounded-md flex items-center justify-center relative"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <input type="file" onChange={handleImageChange} className="hidden" id="fileInput" />
              {animal.imageUrl && (
                <img
                  src={animal.imageUrl}
                  alt="나의 아이 이미지"
                  className="w-full h-full rounded-md"
                />
              )}
            </div>
            <div className="w-[60%] flex flex-col gap-y-3">
              <div className="flex gap-5">
                <label className="text-gray-400">날짜</label>
                <div>{animal.selectedDate}</div>
                <button className="self-end ml-auto px-2 y-1 bg-secondary cursor-pointer text-white rounded hover:bg-primary transition-all">
                  X
                </button>
              </div>
              <div className="flex gap-5">
                <label className="text-gray-400">출발지</label>
                <div>{animal.arrivalArea}</div>
              </div>
              <div className="flex gap-5">
                <label className="text-gray-400">도착지</label>
                <div>{animal.departureArea}</div>
              </div>
              <div className="flex gap-5">
                <div className="flex flex-col gap-y-3">
                  <div className="flex gap-5 justify-between">
                    <label className="text-gray-400">이름</label>
                    <div>{animal.animalName}</div>
                  </div>
                  <div className="flex gap-5">
                    <label className="text-gray-400">품종</label>
                    <div>{animal.breed}</div>
                  </div>
                  <div className="flex gap-5">
                    <label className="text-gray-400">나이</label>
                    <div>{animal.age}</div>
                  </div>
                </div>
                <div className="flex flex-col gap-y-3">
                  <div className="flex gap-5 justify-between">
                    <label className="text-gray-400">동물유형</label>
                    <div>{animal.animalType}</div>
                  </div>
                  <div className="flex gap-5">
                    <label className="text-gray-400">체중</label>
                    <div>{animal.weight}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 하위 정보 */}
          <div className="p-5 flex flex-col gap-y-1 relative">
            <div className="flex flex-col gap-y-1">
              <label className="text-gray-400">특징 및 주의사항</label>
              <div>{animal.notes}</div>
            </div>
            <div className="flex flex-col gap-y-1">
              <label className="text-gray-400">봉사자에게 전하고 싶은 말</label>
              <div>{animal.memo}</div>
            </div>
            <div className="flex mt-5 gap-10">
              <label className="text-gray-400">이동봉사 요청글에 보이기</label>

              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  공개 / 비공개
                </span>
              </label>
            </div>
            <button
              className="self-end ml-auto w-[20%] px-2 py-2 bg-secondary cursor-pointer text-white rounded hover:bg-primary transition-all"
              onClick={handleAnimalInfoEdit}
            >
              정보 수정
            </button>
          </div>
        </article>
      </section>
    </li>
  );
}

export default AnimalCard;
