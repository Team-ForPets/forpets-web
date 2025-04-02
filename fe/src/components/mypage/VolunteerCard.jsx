import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function VolunteerCard() {
  const [image, setImage] = useState('');

  const navigate = useNavigate();

  const handleVolunteerWorkEdit = () => {
    navigate('/volunteer-detail/1');
  };

  return (
    <section className="flex justify-center overflow-y-auto h-full">
      <article className="bg-white w-[95%] rounded-md self-center">
        <div className="flex gap-10 p-5 h-[50%]">
          <div
            className="w-[30%] h-[20vh] bg-gray-300 rounded-md flex items-center justify-center relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <img src={image} alt="봉사자 프로필 이미지" className="w-full h-full rounded-md" />
          </div>
          <div className="w-[70%] flex flex-col gap-y-3">
            <div className="flex gap-5">
              <label className="text-gray-400 text-sm">제목</label>
              <div className="text-sm">강아지 이동봉사 해드립니다.</div>
              <button className="self-end ml-auto px-2 y-1 bg-secondary cursor-pointer text-white rounded hover:bg-primary transition-all">
                X
              </button>
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col gap-y-3">
                <div className="flex gap-5 justify-between">
                  <label className="text-gray-400 text-sm">시작 날짜</label>
                  <div className="text-sm">2025년 03월 20일</div>
                </div>
                <div className="flex gap-5">
                  <label className="text-gray-400 text-sm">출발 가능 지역</label>
                  <div className="text-sm">서울시 도봉구</div>
                </div>
                <div className="flex gap-5">
                  <label className="text-gray-400 text-sm">봉사 가능 품종</label>
                  <div className="text-sm">고양이</div>
                </div>
                <div className="flex gap-5">
                  <label className="text-gray-400 text-sm">전할 말</label>
                  <div className="text-sm">대형견은 무서워서 힘들 것 같습니다...</div>
                </div>
              </div>
              <div className="flex flex-col gap-y-3">
                <div className="flex gap-5 justify-between">
                  <label className="text-gray-400 text-sm">종료 날짜</label>
                  <div className="text-sm">2025년 03월 27일</div>
                </div>
                <div className="flex gap-5">
                  <label className="text-gray-400 text-sm">도착 가능 지역</label>
                  <div className="text-sm">서울시 강남구</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pl-5 pr-5 pb-5 flex h-[50%]">
          <button
            className="self-end ml-auto w-[15%] px-2 py-2 bg-secondary cursor-pointer text-white rounded hover:bg-primary transition-all text-sm"
            onClick={handleVolunteerWorkEdit}
          >
            정보 수정
          </button>
        </div>
      </article>
    </section>
  );
}

export default VolunteerCard;
