import React, { useState } from 'react';

function AnimalCard() {
  const [image, setImage] = useState('');
  const [hovered, setHovered] = useState(false);

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

  return (
    <section className="flex justify-center overflow-y-auto h-full">
      <article className="bg-white w-[95%] h-[95%] rounded-md self-center">
        <div className="flex gap-10 p-5 h-[50%]">
          <div
            className="w-[40%] bg-gray-300 rounded-md flex items-center justify-center relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <input type="file" onChange={handleImageChange} className="hidden" id="fileInput" />
            <img src={image} alt="나의 아이 이미지" className="w-full h-full rounded-md" />
          </div>
          <div className="w-[60%] flex flex-col gap-y-3">
            <div className="flex gap-5">
              <label className="text-gray-400">날짜</label>
              <div>2025년 03월 16일</div>
              <button className="self-end ml-auto px-2 y-1 bg-amber-300 cursor-pointer text-black rounded hover:bg-amber-500 transition-all">
                X
              </button>
            </div>
            <div className="flex gap-5">
              <label className="text-gray-400">출발지</label>
              <div>서울시 도봉구</div>
            </div>
            <div className="flex gap-5">
              <label className="text-gray-400">도착지</label>
              <div>천안시 어쩌구</div>
            </div>

            <div className="flex gap-5">
              <div className="flex flex-col gap-y-3">
                <div className="flex gap-5 justify-between">
                  <label className="text-gray-400">이름</label>
                  <div>노려보는 고양이</div>
                </div>
                <div className="flex gap-5">
                  <label className="text-gray-400">품종</label>
                  <div>도메스틱 숏헤어</div>
                </div>
                <div className="flex gap-5">
                  <label className="text-gray-400">나이</label>
                  <div>16개월</div>
                </div>
              </div>
              <div className="flex flex-col gap-y-3">
                <div className="flex gap-5 justify-between">
                  <label className="text-gray-400">동물유형</label>
                  <div>고양이</div>
                </div>
                <div className="flex gap-5">
                  <label className="text-gray-400">체중</label>
                  <div>2kg</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-5 flex h-[50%]">
          <div className="flex flex-col gap-y-3">
            <div className="flex flex-col gap-y-1">
              <label className="text-gray-400">특징 및 주의사항</label>
              <div>매섭게 노려봄</div>
            </div>
            <div className="flex flex-col gap-y-1">
              <label className="text-gray-400">봉사자에게 전하고 싶은 말</label>
              <div>노려보지 말 것</div>
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
          </div>
          <button className="self-end ml-auto w-[25%] h-[25%] px-2 py-2 bg-amber-300 cursor-pointer text-black rounded hover:bg-amber-500 transition-all">
            정보 수정
          </button>
        </div>
      </article>
    </section>
  );
}

export default AnimalCard;
