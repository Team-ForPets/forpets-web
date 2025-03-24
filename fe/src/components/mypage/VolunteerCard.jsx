import React, { useState } from 'react';

function VolunteerCard() {
  const [image, setImage] = useState('');

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
              <div className="text-sm">서울시 어쩌구에서 천안 이동봉사 가능해요.</div>
              <button className="self-end ml-auto px-2 y-1 bg-amber-300 cursor-pointer text-black rounded hover:bg-amber-500 transition-all">
                X
              </button>
            </div>
            <div className="flex gap-5">
              <div className="flex flex-col gap-y-3">
                <div className="flex gap-5 justify-between">
                  <label className="text-gray-400 text-sm">시작 날짜</label>
                  <div className="text-sm">2025년 03월 16일</div>
                </div>
                <div className="flex gap-5">
                  <label className="text-gray-400 text-sm">출발 가능 지역</label>
                  <div className="text-sm">서울시 어쩌구</div>
                </div>
                <div className="flex gap-5">
                  <label className="text-gray-400 text-sm">봉사 가능 품종</label>
                  <div className="text-sm">개, 고양이</div>
                </div>
                <div className="flex gap-5">
                  <label className="text-gray-400 text-sm">전할 말</label>
                  <div className="text-sm">대형견은 불가능해요.</div>
                </div>
              </div>
              <div className="flex flex-col gap-y-3">
                <div className="flex gap-5 justify-between">
                  <label className="text-gray-400 text-sm">종료 날짜</label>
                  <div className="text-sm">2025년 03월 20일</div>
                </div>
                <div className="flex gap-5">
                  <label className="text-gray-400 text-sm">도착 가능 지역</label>
                  <div className="text-sm">천안시 어쩌구</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pl-5 pr-5 pb-5 flex h-[50%]">
          <button className="self-end ml-auto w-[15%] px-2 py-2 bg-amber-300 cursor-pointer text-black rounded hover:bg-amber-500 transition-all text-sm">
            정보 수정
          </button>
        </div>
      </article>
    </section>
  );
}

export default VolunteerCard;
