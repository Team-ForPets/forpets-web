import React from 'react'
import logo from '../assets/forpetsLogo.png';

function AnimalCard({ animal }) {
  const {
    animalName,
    animalType,
    arrivalArea,
    breed,
    departureArea,
    id,
    imageUrl,
    memo,
    notice,
    selectedDate,
    weight,
  } = animal;

  return (
    <li className="w-[290px] h-[400px] bg-white shadow-lg shadow-gray-300 rounded-2xl overflow-hidden relative cursor-pointer">
      <img
        src={imageUrl === null ? logo : imageUrl}
        alt="이동봉사가 필요한 아이 사진"
        className="w-full h-[45%] object-scale-down"
      />
      <section className="flex flex-col gap-3 p-5 mt-2">
        <p className="flex-1">이름 : {animalName}</p>
        <p className="flex-1">
          종류 : {animalType === 'DOG' ? '강아지' : animalType === 'CAT' ? '고양이' : '기타'}
        </p>
        <p className="flex-1">봉사날짜 : {selectedDate}</p>
        <p className="flex-1">출발지역 : {departureArea}</p>
        <p className="flex-1">도착지역 : {arrivalArea}</p>
      </section>
    </li>
  );
}

export default AnimalCard