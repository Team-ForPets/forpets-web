import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VolunteerCard from '../../components/volunteer/VolunteerCard';
import volunteerApi from '../../api/volunteerApi';

function VolunteerList() {
  const [volunteers, setVolunteers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await volunteerApi.getVolunteers();
        setVolunteers(response.data);
      } catch (error) {
        console.error('봉사자 데이터를 불러오는 중 오류 발생:', error);
      }
    };
    fetchVolunteers();
  }, []);

  const handleVolunteerDetail = (volunteer) => {
    navigate(`/volunteer-detail/${volunteer.id}`, { state: { volunteer } });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">등록된 봉사자 목록</h2>
      {volunteers.length === 0 ? (
        <p className="text-gray-600 text-center py-10">봉사자 목록이 없습니다.</p>
      ) : (
        <ul className="flex flex-wrap justify-between gap-4">
          {volunteers.map((volunteer) => (
            <li
              key={volunteer.id}
              onClick={() => handleVolunteerDetail(volunteer)}
              className="cursor-pointer hover:opacity-90 transition-opacity"
            >
              <VolunteerCard volunteer={volunteer} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default VolunteerList;
