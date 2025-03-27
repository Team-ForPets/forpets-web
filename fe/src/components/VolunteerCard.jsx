import React from 'react';

function VolunteerCard({ volunteer }) {
  console.log(volunteer);

  return (
    <li className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex flex-col items-center text-center">
        {/* Render placeholder image if imageUrl is null */}
        <img
          src={volunteer.imageUrl || '/assets/person.jpeg'}
          alt="회원 이미지"
          className="w-32 h-32 rounded-lg object-cover mb-4"
        />
        {/* Render volunteer information */}
        <div className='text-left'>
          <h3 className="text-lg font-bold mb-2">제목 {volunteer.title || '제목 없음'}</h3>
          <p className="text-sm text-gray-600">시작 가능 날짜: {volunteer.startDate || '정보 없음'}</p>
          <p className="text-sm text-gray-600">종료 가능 날짜: {volunteer.endDate || '정보 없음'}</p>
          <p className="text-sm text-gray-600">출발 가능 지역: {volunteer.departureArea || '정보 없음'}</p>
          <p className="text-sm text-gray-600">도착 가능 지역: {volunteer.arrivalArea || '정보 없음'}</p>
        </div>
      </div>
    </li>
  );
}

export default VolunteerCard;
