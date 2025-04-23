import React from 'react';

function VolunteerCard({ volunteer }) {
  // console.log(volunteer);

  return (
    <li className="w-[290px] h-[400px] bg-white shadow-lg shadow-gray-300 rounded-2xl overflow-hidden relative cursor-pointer">
      {/* Render placeholder image if imageUrl is null */}
      <img
        src={volunteer.imageUrl || '/assets/person.jpeg'}
        alt="회원 이미지"
        className="w-full h-[45%] object-scale-down"
      />
      {/* Render volunteer information */}
      <div className="flex flex-col gap-3 p-5 mt-2">
        <h3 className="text-lg font-bold mb-2">제목: {volunteer.title || '제목 없음'}</h3>
        <p className="flex-1">시작 가능 날짜: {volunteer.startDate || '정보 없음'}</p>
        <p className="flex-1">종료 가능 날짜: {volunteer.endDate || '정보 없음'}</p>
        <p className="flex-1">출발 가능 지역: {volunteer.departureArea || '정보 없음'}</p>
        <p className="flex-1">도착 가능 지역: {volunteer.arrivalArea || '정보 없음'}</p>
      </div>
    </li>
  );
}

export default VolunteerCard;
