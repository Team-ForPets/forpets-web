import React, { useEffect, useState } from 'react';
import mypageApi from '../../api/mypageApi';
import AnimalCard from './AnimalCard';
function AnimalCardList() {
  const [myAnimals, setMyAnimals] = useState([]);

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const response = await mypageApi.getMyAnimals();
        console.log('응답 데이터 response', response);
        console.log('응답 데이터 response.data', response.data);
        console.log('응답 데이터 response.data.animals', response.data.animals);

        setMyAnimals(response.data.animals || []);
        console.log('받은 데이터', myAnimals);
      } catch (err) {
        console.error(err);
        console.log('데이터를 읽어오지 못했습니다.');
        setMyAnimals([]);
      }
    };
    fetchAnimal();
  }, []);

  return (
    <section className="flex justify-center overflow-y-auto h-full max-h-[70vh]">
      {/* 내 동물 카드 렌더링 */}
      <ul className="flex flex-col gap-4">
        {myAnimals.length > 0 ? (
          myAnimals.map((animal) => <AnimalCard key={animal.id} animal={animal} />)
        ) : (
          <li>정보가 없습니다.</li>
        )}
      </ul>
    </section>
  );
}

export default AnimalCardList;
