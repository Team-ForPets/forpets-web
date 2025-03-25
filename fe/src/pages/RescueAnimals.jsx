import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RescueAnimalCard from '../components/RescueAnimalCard';

function RescueAnimals() {
  const [animals, setAnimals] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all'); // 탭 상태 관리
  const serviceKey = import.meta.env.VITE_RESCUE_ANIMALS_KEY;

  // 카테고리에 맞는 데이터 불러오기
  const fetchData = async (category) => {
    try {
      const BaseURL =
        'https://apis.data.go.kr/1543061/abandonmentPublicService_v2/abandonmentPublic_v2';
      const params = {
        serviceKey: serviceKey,
        _type: 'json',
        pageNo: 1,
        numOfRows: 8,
      };

      // 선택된 카테고리에 따른 조건 추가
      if (category === 'dog') {
        params.upkind = 417000; // 개
      } else if (category === 'cat') {
        params.upkind = 422400; // 고양이
      } else if (category === 'etc') {
        params.upkind = 429900; // 기타
      }

      const response = await axios.get(BaseURL, { params });
      const animals = response.data.response.body.items.item;
      setAnimals(animals);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(activeCategory); // 첫 렌더링 시 activeCategory에 맞는 동물 정보 가져오기
  }, [activeCategory]);

  return (
    <div>
      {/* 카테고리 탭 */}
      <div className="flex mb-4">
        <button
          className={`p-2 ${activeCategory === 'all' ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          전체
        </button>
        <button
          className={`p-2 ${activeCategory === 'dog' ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => setActiveCategory('dog')}
        >
          개
        </button>
        <button
          className={`p-2 ${activeCategory === 'cat' ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => setActiveCategory('cat')}
        >
          고양이
        </button>
        <button
          className={`p-2 ${activeCategory === 'etc' ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => setActiveCategory('etc')}
        >
          기타
        </button>
      </div>

      {/* 동물 카드 렌더링 */}
      <ul className="flex flex-wrap w-[100%]">
        {animals.length > 0 ? (
          animals.map((animal) => <RescueAnimalCard key={animal.desertionNo} animal={animal} />)
        ) : (
          <li>유기동물 정보가 없습니다.</li>
        )}
      </ul>
    </div>
  );
}

export default RescueAnimals;
