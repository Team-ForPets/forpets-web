import React, { useEffect, useState } from 'react';
import animalsApi from '../../api/animalsApi';
import AnimalCard from '../../components/animal/AnimalCard';

function AnimalList() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await animalsApi.getAnimals();
        setAnimals(response.data.animals);
      } catch (error) {
        console.error('동물 데이터를 불러오는 중 오류 발생:', error);
      }
    };
    fetchAnimals();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">등록된 이동봉사 요청글 목록</h2>
      {animals.length === 0 ? (
        <p className="text-gray-600 text-center py-10">등록된 이동봉사 요청글이 없습니다.</p>
      ) : (
        <ul className="flex flex-wrap justify-between gap-4">
          {animals.map((animal) => (
            <li key={animal.id}>
              <AnimalCard animal={animal} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AnimalList;
