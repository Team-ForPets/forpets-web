import React from 'react';

function VolunteerCard({ volunteer }) {
  return (
    <li className="w-[290px] h-[420px] bg-white rounded-2xl shadow-xl overflow-hidden relative cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      {/* 이미지 */}
      <div className="w-full h-[45%] bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={volunteer.imageUrl || '/assets/logo.png'}
          alt="회원 이미지"
          className="object-contain w-full h-full"
        />
      </div>
      {/* 내용 */}
      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-1 truncate">
          제목: {volunteer.title || '제목 없음'}
        </h3>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">시작 가능 날짜:</span>{' '}
          {volunteer.startDate || '정보 없음'}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">종료 가능 날짜:</span>{' '}
          {volunteer.endDate || '정보 없음'}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">출발 가능 지역:</span>{' '}
          {volunteer.departureArea || '정보 없음'}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">도착 가능 지역:</span>{' '}
          {volunteer.arrivalArea || '정보 없음'}
        </p>
      </div>
    </li>
  );
}

export default VolunteerCard;
