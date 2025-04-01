import { Navigate } from 'react-router-dom';

function VolunteerWorkStatusCard({ service }) {
  const stateMap = {
    progress: '진행중',
    done: '완료',
  };
  // const navigate = useNavigate();

  // const handleRescueAnimalDetail = () => {
  //   navigate('/rescue-animal-detail', { state: { animal } });
  // };
  return (
    <li
      className="justify-around gap-2 min-w-[400px] w-[48%] h-[180px] flex bg-white shadow-md border border-gray-300 rounded-sm overflow-hidden relative cursor-pointer p-1"
      // onClick={handleRescueAnimalDetail}
    >
      <img
        // src=""
        src={`${service.imageUrl}`}
        alt="동물 사진"
        className="w-[180px] h-[170px] object-cover border-1 border-amber-500 rounded-sm "
      />
      <div className="w-[250px] p-1 flex flex-col gap-1">
        <div className="flex gap-1">
          <p className="w-[50px] text-gray-500 ">이름</p>
          <p>{service.animalName}</p>
        </div>
        <div className="flex gap-1">
          <p className="w-[50px] text-gray-500">요청자</p>
          <p>{service.requestorNickname}</p>
        </div>
        <div className="flex gap-1">
          <p className="w-[50px] text-gray-500">봉사자</p>
          <p>{service.volunteerNickname}</p>
        </div>
        <div className="flex gap-1">
          <p className="w-[50px] text-gray-500">여정</p>
          <div>
            <p>{service.departureArea}</p>
            <p>{service.arrivalArea}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <p className="w-[50px] text-gray-500">상태</p>
          <p>{stateMap[service.state] || '알 수 없음'}</p>
        </div>
        {/* </div> */}
      </div>
    </li>
  );
}
export default VolunteerWorkStatusCard;
