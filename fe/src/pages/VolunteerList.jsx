import React, { useEffect, useState } from 'react';
import VolunteerCard from '../components/VolunteerCard';
import volunteerApi from '../api/volunteerApi';
import { useNavigate } from 'react-router-dom';
function VolunteerList() {
  // 초기 상태를 빈 배열로 설정
  const [volunteers, setVolunteers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getVolunteers = async () => {
      try {
        const response = await volunteerApi.getVolunteers(); // API 호출
        const data = response.data;
        setVolunteers(data); // API 응답의 data 필드 사용
      } catch (error) {
        console.error('Error fetching volunteers:', error);
      }
    };
    getVolunteers();
  }, []);
  // const handleVounteerDetail = () => {
  //   navigate(`/volunteer-detail/${}`);
  // };
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">등록된 봉사자 목록</h2>
      {volunteers.length === 0 ? (
        <p className="text-gray-500">봉사자 목록이 없습니다.</p>
      ) : (
        <ul className="grid grid-cols-4 gap-4">
          {volunteers.map((volunteer) => {
            return (
              <VolunteerCard
                // onclick={handleVounteerDetail}
                key={volunteer.id}
                volunteer={volunteer}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default VolunteerList;
