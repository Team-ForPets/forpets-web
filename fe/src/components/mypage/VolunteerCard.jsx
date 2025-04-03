import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function VolunteerCard({ myVolunteerPost }) {
  // const [image, setImage] = useState('');

  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleVolunteerWorkEdit = () => {
    navigate(`/volunteer-detail/${myVolunteerPost.id}`);
  };

  return (
    <li>
      <section className="flex justify-center overflow-y-auto h-full">
        <article className="bg-white w-[95%] rounded-md self-center">
          <div className="flex gap-10 p-5 h-[50%]">
            <div
              className="w-[30%] h-[20vh] bg-gray-300 rounded-md flex items-center justify-center relative"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {/* <img
                src={myVolunteerPost.image || '../assets/forpetsLogo.png'}
                alt="봉사자 프로필 이미지"
                className="w-full h-full rounded-md"
              /> */}
            </div>
            <div className="w-[70%] flex flex-col gap-y-3">
              <div className="flex gap-5">
                <label className="text-gray-400 text-sm">제목</label>
                <div className="text-sm">{myVolunteerPost.title}</div>
                <button className="self-end ml-auto px-2 y-1 bg-secondary cursor-pointer text-white rounded hover:bg-primary transition-all">
                  X
                </button>
              </div>
              <div className="flex gap-5">
                <div className="flex flex-col gap-y-3">
                  <div className="flex gap-5 justify-between">
                    <label className="text-gray-400 text-sm">시작 날짜</label>
                    <div className="text-sm">{myVolunteerPost.startDate}</div>
                  </div>
                  <div className="flex gap-5">
                    <label className="text-gray-400 text-sm">출발 가능 지역</label>
                    <div className="text-sm">{myVolunteerPost.arrivalArea}</div>
                  </div>
                  {/* <div className="flex gap-5">
                    <label className="text-gray-400 text-sm">봉사 가능 품종</label>
                    <div className="text-sm">{myVolunteerPost.title}</div>
                  </div>
                  <div className="flex gap-5">
                    <label className="text-gray-400 text-sm">전할 말</label>
                    <div className="text-sm">{myVolunteerPost.title}</div>
                  </div> */}
                </div>
                <div className="flex flex-col gap-y-3">
                  <div className="flex gap-5 justify-between">
                    <label className="text-gray-400 text-sm">종료 날짜</label>
                    <div className="text-sm">{myVolunteerPost.endDate}</div>
                  </div>
                  <div className="flex gap-5">
                    <label className="text-gray-400 text-sm">도착 가능 지역</label>
                    <div className="text-sm">{myVolunteerPost.departureArea}</div>
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
    </li>
  );
}

export default VolunteerCard;
