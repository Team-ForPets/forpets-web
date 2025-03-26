import React from 'react';
import VolunteerCard from '../components/mypage/VolunteerCard';

function VolunteerList() {
  // 가상의 봉사자 데이터
  // const volunteers = [
  //   {
  //     id: 1,
  //     title: '제목1',
  //     startDate: '2025-03-01',
  //     endDate: '2025-03-05',
  //     departureArea: '서울',
  //     ArrivalArea: '구미',
  //     imageUrl: 'https://via.placeholder.com/100',
  //   },

  //   {
  //     id: 2,
  //     title: '제목2',
  //     startDate: '2025-03-02',
  //     endDate: '2025-03-06',
  //     departureArea: '부산',
  //     ArrivalArea: '구미',
  //     imageUrl: 'https://via.placeholder.com/100',
  //   },
  //   {
  //     id: 3,
  //     title: '제목3',
  //     startDate: '2025-03-03',
  //     endDate: '2025-03-07',
  //     departureArea: '대구',
  //     ArrivalArea: '구미',
  //     imageUrl: 'https://via.placeholder.com/100',
  //   },
  // ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">등록된 봉사자 목록</h2>
      <ul className="space-y-4">
        {volunteers.map((volunteer) => (
          <li key={volunteer.id}>
            <VolunteerCard volunteer={volunteer} />
            {/* volunteers의  DB에서 저장된 데이터를 가져와야 한다. 어떻게 데이터를 가져와야 할까? */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VolunteerList;
