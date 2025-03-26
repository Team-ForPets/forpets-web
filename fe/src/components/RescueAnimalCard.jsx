import React from 'react';
import { useNavigate } from 'react-router-dom';
function RescueAnimalCard({ animal }) {
  console.log(animal);
const navigator = useNavigate()
  const {
    happenDt,
    happenPlace,
    age,
    kindNm,
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
    navigator("/")
  };
  return (
    <li
      className="w-[23%] h-[320px] bg-white shadow-lg rounded-2xl overflow-hidden m-2 relative"
      onClick={handleRescueAnimalDetail}
    >
      <img src={popfile1} alt="구조 동물 사진" className="w-full h-[60%] object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{kindNm}</h3>
        <p className="text-sm text-gray-600">📍 {happenPlace}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm">
            🏷️ <strong>{processState}</strong>
          </span>
          <span className="text-sm">📅 {noticeEdt}</span>
        </div>
        <div className="flex justify-end items-center mt-3">
          <span className={`mr-2 ${sexCd === 'M' ? 'text-blue-500' : 'text-pink-500'}`}>
            {sexCd === 'M' ? '♂️' : '♀️'}
          </span>
          <span className={`text-sm ${neuterYn === 'Y' ? 'text-green-500' : 'text-red-500'}`}>
            {neuterYn === 'Y' ? '✔️' : '✖️'}
          </span>
        </div>
      </div>
    </li>
  );
}

export default RescueAnimalCard;
