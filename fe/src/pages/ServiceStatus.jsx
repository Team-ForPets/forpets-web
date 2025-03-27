import React, { useEffect, useState } from 'react';
import serviceStatusApi from '../api/serviceStatusApi';
import ServiceStatusCard from '../components/ServiceStatusCard';

const dummyData = [
  {
    serviceStatusId: 1,
    animalName: '동동이',
    requestor: '강아지러버',
    volunteer: '금일',
    departureArea: '서울 도봉구',
    arrivalArea: '서울 강남구',
    state: 'progress',
    createdAt: '2025-02-27T15:53:49.690364',
    updatedAt: '2025-02-27T15:53:49.709331',
  },
  {
    serviceStatusId: 2,
    animalName: '킹냥이',
    requestor: '노드크루',
    volunteer: '갈배',
    departureArea: '서울 동대문구',
    arrivalArea: '서울 성동구',
    state: 'progress',
    createdAt: '2025-03-12T15:53:49.690364',
    updatedAt: '2025-03-12T15:53:49.709331',
  },
  {
    serviceStatusId: 1,
    animalName: '동동이',
    requestor: '강아지러버',
    volunteer: '금일',
    departureArea: '서울 도봉구',
    arrivalArea: '서울 강남구',
    state: 'progress',
    createdAt: '2025-02-27T15:53:49.690364',
    updatedAt: '2025-02-27T15:53:49.709331',
  },
  {
    serviceStatusId: 2,
    animalName: '킹냥이',
    requestor: '노드크루',
    volunteer: '갈배',
    departureArea: '서울 동대문구',
    arrivalArea: '서울 성동구',
    state: 'progress',
    createdAt: '2025-03-12T15:53:49.690364',
    updatedAt: '2025-03-12T15:53:49.709331',
  },
];

function ServiceStatus() {
  const [services, setServices] = useState([]);
  const [status, setStatus] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all'); // 현재 선택된 버튼 상태

  const selectBtn = ['all', 'progress', 'done', 'myServiceStatus'];

  // 더미 데이터 테스트용
  const fetchServices = async (status) => {
    try {
      // API 호출 대신 더미 데이터 사용
      if (status === 'myServiceStatus') {
        setServices();
      } else {
        setServices(dummyData.filter((service) => service.state === status));
      }
    } catch (err) {
      console.error(err);
      console.log('데이터를 읽어오지 못했습니다.');
    }
  };
  // 실 사용 로직 -
  // const fetchServices = async (status) => {
  //   let response;
  //   try {
  //     if (status !== 'myServiceStatus') {
  //       response = await serviceStatusApi.getServiceStatus(status);
  //     } else {
  //       response = await serviceStatusApi.getServiceStatus();
  //     }
  //     setServices(response.data);
  //   } catch (err) {
  //     console.error(err);
  //     console.log('데이터를 읽어오지 못했습니다.');
  //   }
  // };

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
              : status === 'progress'
                ? '진행중'
                : status === 'done'
                  ? '완료'
                  : '내아이'}
          </button>
        ))}
      </div>

      {/* 동물 카드 렌더링 */}
      <ul className="flex flex-wrap w-[100%] justify-start gap-4">
        {services.length > 0 ? (
          services.map((service) => <ServiceStatusCard key={service.id} service={service} />)
        ) : (
          <li>정보가 없습니다.</li>
        )}
      </ul>
    </div>
  );
}

export default ServiceStatus;
