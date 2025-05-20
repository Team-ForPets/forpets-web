import React from 'react';
import logo from '../../assets/forpetsLogo.png';
import { useNavigate } from 'react-router-dom';

function AnimalCard({ animal }) {
  const navigate = useNavigate();

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

  const handleOnclick = () => {
    navigate('/animal-detail', { state: { animal } });
  };

  return (
    <li
      className="w-[290px] h-[420px] bg-white rounded-2xl shadow-lg shadow-gray-300 overflow-hidden relative cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
      onClick={handleOnclick}
    >
      {/* 이미지 영역 */}
      <div className="w-full h-[45%] bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={imageUrl === null ? logo : imageUrl}
          alt="이동봉사가 필요한 아이 사진"
          className="object-contain w-full h-full"
        />
      </div>

      {/* 정보 영역 */}
      <section className="flex flex-col gap-2 p-4">
        <p className="text-base text-gray-800 font-semibold truncate">
          이름: <span className="font-normal">{animalName || '정보 없음'}</span>
        </p>
        <p className="text-base text-gray-800 font-semibold truncate">
          종류:{' '}
          <span className="font-normal">
            {animalType === 'DOG' ? '강아지' : animalType === 'CAT' ? '고양이' : '기타'}
          </span>
        </p>
        <p className="text-base text-gray-800 font-semibold truncate">
          봉사날짜: <span className="font-normal">{selectedDate || '정보 없음'}</span>
        </p>
        <p className="text-base text-gray-800 font-semibold truncate">
          출발지역: <span className="font-normal">{departureArea || '정보 없음'}</span>
        </p>
        <p className="text-base text-gray-800 font-semibold truncate">
          도착지역: <span className="font-normal">{arrivalArea || '정보 없음'}</span>
        </p>
      </section>
    </li>
  );
}

export default AnimalCard;
