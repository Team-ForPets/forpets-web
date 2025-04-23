import React, { useEffect, useState } from 'react';
import animalsApi from '../api/animalsApi';
import RescueAnimalCard from '../components/RescueAnimalCard';
import AnimalCard from '../components/AnimalCard';

function AnimalList() {
  const [animals, setAnimals] = useState([]);

  const fetchData = async () => {
    try {
      const response = await animalsApi.getAnimals();
      const data = response.data.animals;
      setAnimals(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h2 className="text-xl font-bold mb-4">등록된 이동봉사 요청글 목록</h2>
      <ul className="flex flex-wrap justify-evenly gap-[18px]">
        {animals.length > 0 ? (
          animals.map((animal) => <AnimalCard key={animal.id} animal={animal} />)
        ) : (
          <li className="text-2xl mt-50">등록된 이동봉사 요청글이 없습니다</li>
        )}
      </ul>
    </>
  );
}

export default AnimalList;
