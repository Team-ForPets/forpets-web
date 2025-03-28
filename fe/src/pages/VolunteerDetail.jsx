import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import volunteerApi from '../api/volunteerApi';

function VolunteerDetail() {
  const [volunteer, setVolunteer] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getVolunteerDetail = async () => {
      try {
        const response = await volunteerApi.getVolunteerById(id); // API 호출
        const data = response.data;
        setVolunteer(data); // API 응답의 data 필드 사용
      } catch (error) {
        console.error('Error fetching volunteers:', error);
      }
    };
    getVolunteerDetail();
  }, [id]);

  const handleChatStart = () => {
    navigate('/chat/rooms', {
      state: {
        volunteerId: id,
         },
    });
  };

  if (!volunteer) {
    return <p>봉사 정보가 없습니다.</p>;
  }
  return (
    <div className="bg-white rounded-2xl shadow-md w-[100%] p-4 m-2 flex flex-col">
      <img
        src={volunteer.user.imageUrl || '/assets/person.jpeg'}
        alt="회원 이미지"
        className="rounded-xl w-full max-h-[80vh] mb-4"
      />

      <div className="space-y-4">
          <div className="flex items-center">
            <span className="font-semibold w-24 mr-2">제목</span>
            <span>{volunteer.title}</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold w-24 mr-2">닉네임</span>
            <span>{volunteer.user.nickName}</span>
        </div>

        <div className="flex items-center">
          <span className="font-semibold w-24 mr-2">시작일</span>
          <span>{volunteer.startDate}</span>
        </div>

        <div className="flex items-center">
          <span className="font-semibold w-24 mr-2">종료일</span>
          <span>{volunteer.endDate}</span>
        </div>

        <div className="flex items-center">
          <span className="font-semibold w-24 mr-2">출발 지역</span>
          <span>{volunteer.departureArea}</span>
        </div>

        <div className="flex items-center">
          <span className="font-semibold w-24 mr-2">도착 지역</span>
          <span>{volunteer.arrivalArea}</span>
        </div>

        <div className="flex items-center">
          <span className="font-semibold w-24 mr-2">봉사 가능 동물</span>
          <span>{volunteer.animalType}</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex flex-col">
          <span className="font-semibold w-16 mb-2">전할 말</span>
          <div className="rounded-lg p-3 text-sm text-gray-700">{volunteer.notice}</div>
        </div>
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <button className="bg-orange-500 text-white py-2 px-4 rounded-lg">수정하기</button>
        <button onClick={handleChatStart}
          className="bg-orange-500 text-white py-2 px-4 rounded-lg">
          채팅하기
        </button>
      </div>
    </div>
  );
}

export default VolunteerDetail;
