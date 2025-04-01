import React, { useEffect, useState } from 'react';
import VolunteerWorkStatusApi from '../api/volunteerWorkStatusApi';
import VolunteerWorkStatusCard from '../components/VolunteerWorkStatusCard';

function VolunteerWorkStatus() {
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all'); // 현재 선택된 버튼 상태

  const selectBtn = ['all', 'in-progress', 'completed', 'my'];
  const fetchServices = async (status) => {
    try {
      let response;
      if (status === 'my') {
        response = await VolunteerWorkStatusApi.getMyVolunteerWorkStatus();
        setServices(response.data.data.volunteerWorkStatuses || []);
      } else {
        response = await VolunteerWorkStatusApi.getVolunteerWorkStatus(status);
        setServices(response.data.volunteerWorkStatuses || []);
      }
      console.log('스테이터스', status);
      console.log('응답 데이터', response);
    } catch (err) {
      console.error(err);
      console.log('데이터를 읽어오지 못했습니다.');
      setServices([]);
    }
  };

  useEffect(() => {
    fetchServices(status); // 첫 렌더링 시 activeCategory에 맞는 동물 정보 가져오기
  }, [status]);

  // 카테고리 변경 핸들러
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setSelectedStatus(newStatus);
  };

  return (
    <div>
      {/* 카테고리 탭 */}
      <div className="flex mb-4 gap-1">
        {selectBtn.map((status) => (
          <button
            key={status}
            onClick={() => handleStatusChange(status)}
            className={`w-[80px] p-1 cursor-pointer rounded-md ${selectedStatus === status ? 'bg-[#FF983F] text-white' : 'bg-gray-200'} outline-amber-400 `}
          >
            {status === 'all'
              ? '전체'
              : status === 'in-progress'
                ? '진행중'
                : status === 'completed'
                  ? '완료'
                  : status === 'my'
                    ? '내아이'
                    : ''}
          </button>
        ))}
      </div>

      {/* 동물 카드 렌더링 */}
      <ul className="flex flex-wrap w-[100%] justify-start gap-4">
        {services.length > 0 ? (
          services.map((service) => <VolunteerWorkStatusCard key={service.id} service={service} />)
        ) : (
          <li>정보가 없습니다.</li>
        )}
      </ul>
    </div>
  );
}

export default VolunteerWorkStatus;
