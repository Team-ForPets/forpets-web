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
      className="flex flex-col sm:flex-row items-center gap-1 border rounded-md box-border bg-white cursor-pointer"
      onClick={handleDetailPage}
    >
      <div className="w-full sm:w-[30%] h-[150px] sm:h-[100px]">
        <img
          className="w-full h-full rounded-t-md sm:rounded-l-md sm:rounded-tr-none"
          src={imageUrl}
          alt="나의아이 이미지"
        />
      </div>
      <ul className="w-full sm:w-[70%] text-[12px] pb-2 sm:pb-0">
        <li>출발지: {departureArea}</li>
        <li>도착지: {arrivalArea}</li>
        <li>동물유형: {animalType === 'DOG' ? '개' : animalType === 'CAT' ? '고양이' : '기타'}</li>
        <li>체중: {weight}kg</li>
      </ul>
    </li>
  );
}
export default MainAnimalCard;
