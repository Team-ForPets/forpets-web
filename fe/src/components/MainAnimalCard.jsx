import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainAnimalCard({ animal }) {
  const { id, departureArea, arrivalArea, animalType, weight, imageUrl } = animal;
  const navigate = useNavigate();
  const handleDetailPage = () => {
    navigate('/animal-detail', { state: { animal } });
  };
  return (
    <li
      className="w-full h-[150px]  flex items-center gap-5 p-3 border rounded-md box-border bg-[#ffffff] cursor-pointer"
      onClick={handleDetailPage}
    >
      <div className="w-[100px] ">
        <img className="w-[100px] object-cover" src={`assets/logo.png`} alt="나의아이 이미지" />
        {/* 이미지 값 들어오면 변경예정 */}
        {/* <img src={`${imageUrl}`} alt="나의아이 이미지" /> */}
      </div>
      <ul className="text-[12px]">
        <li>출발지: {departureArea}</li>
        <li>도착지: {arrivalArea}</li>
        <li>동물유형: {animalType === 'DOG' ? '개' : animalType === 'CAT' ? '고양이' : '기타'}</li>
        <li>체중: {weight}kg</li>
      </ul>
    </li>
  );
}
export default MainAnimalCard;
