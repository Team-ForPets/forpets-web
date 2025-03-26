import React, { useEffect, useState } from 'react';
import VolunteerCard from '../components/mypage/VolunteerCard';
import api from '../api/axios';
import volunteerApi from '../api/volunteerApi';
function VolunteerList() {
  // 초기 상태를 빈 배열로 설정
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    const getVolunteers = async () => {
      try {
        const response = await api.get('http://localhost:8080/api/service-volunteer'); // API 호출
        console.log(response.data);
        const data = response.data;
        console.log('data', data);
        if (data.code === 'OK') {
          setVolunteers(data.data); // API 응답의 data 필드 사용
        }
      } catch (error) {
        console.error('Error fetching volunteers:', error);
      }
    };
    getVolunteers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">등록된 봉사자 목록</h2>
      {/* 데이터가 없을 경우 처리 */}
      {volunteers.length === 0 ? (
        <p className="text-gray-500">봉사자 목록이 없습니다.</p>
      ) : (
        <ul className="grid grid-cols-4 gap-4">
          {' '}
          {/* 그리드 형태로 렌더링 */}
          {volunteers.map((volunteer, index) => (
            <li key={index}>
              <VolunteerCard volunteer={volunteer} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default VolunteerList;
