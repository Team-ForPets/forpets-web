import React from 'react';

function VolunteerCard({ volunteer }) {
  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4">
        {/* 동물 이미지 */}
        <img
          src={volunteer.imageUrl || 'https://via.placeholder.com/100'} // 기본 이미지 URL
          alt="동물 이미지"
          className="w-24 h-24 rounded-full object-cover"
        />
        {/* 봉사자 정보 */}
        <div>
          <h3 className="text-lg font-bold">{volunteer.title}</h3>
          <p className="text-sm text-gray-600">시작 가능 날짜: {volunteer.startDate}</p>
          <p className="text-sm text-gray-600">출발 가능 지역: {volunteer.departureArea}</p>
          <p className="text-sm text-gray-600">종료 가능 날짜: {volunteer.endDate}</p>
          <p className="text-sm text-gray-600">도착 가능 지역: {volunteer.arrivalArea}</p>
        
        </div>
      </div>
    </div>
  );
}

export default VolunteerCard;