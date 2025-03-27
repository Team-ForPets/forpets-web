import React from 'react';
import { useNavigate } from 'react-router-dom';
function RescueAnimalCard({ animal }) {
  console.log(animal);
  const navigate = useNavigate();
  const {
    happenDt,
    happenPlace,
    age,
    kindNm,
    kindFullNm,
    colorCd,
    weight,
    popfile1,
    noticeSdt,
    noticeEdt,
    processState,
    sexCd,
    neuterYn,
    specialMark,
    careNm,
    careTel,
    careAddr,
    careOwnerNm,
    orgNm,
    updTm,
  } = animal;

  const handleRescueAnimalDetail = () => {
    navigate('/rescue-animal-detail', { state: { animal } });
  };
  return (
    <li
      className="w-[220px] h-[350px] bg-white shadow-lg rounded-2xl overflow-hidden relative cursor-pointer"
      onClick={handleRescueAnimalDetail}
    >
      <img src={popfile1} alt="구조 동물 사진" className="w-full h-[50%] " />
      <div className="p-1 flex flex-col">
        <h3 className="text-lg font-semibold mb-1">{kindFullNm}</h3>
        <p className="text-sm text-gray-600">{happenPlace}</p>
        <span className="text-sm">🏷️ {processState}</span>
        <span className="text-sm">📅 {noticeEdt}</span>
        <div className="flex justify-start items-center mt-3 gap-5">
          <span>성별{sexCd === 'M' ? '♂️' : '♀️'}</span>
          <span>중성화 여부{neuterYn === 'Y' ? '✔️' : '✖️'}</span>
        </div>
      </div>
    </li>
  );
}

export default RescueAnimalCard;
