import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RescueAnimalCard from '../components/RescueAnimalCard';

function RescueAnimalList() {
  const [animals, setAnimals] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all'); // 탭 상태 관리
  const serviceKey = import.meta.env.VITE_RESCUE_ANIMALS_KEY;
  const animal = ['all', 'dog', 'cat', 'etc'];
  // 카테고리에 맞는 데이터 불러오기
  const fetchData = async (category) => {
    try {
      const BaseURL =
        'https://apis.data.go.kr/1543061/abandonmentPublicService_v2/abandonmentPublic_v2';
      const params = {
        serviceKey: serviceKey,
        _type: 'json',
        pageNo: 1,
        numOfRows: 12,
      };

      // 선택된 카테고리에 따른 조건 추가
      if (category !== 'all') {
        const categoryMap = {
          dog: 417000,
          cat: 422400,
          etc: 429900,
        };
        params.upkind = categoryMap[category];
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

  // 카테고리 변경 핸들러
  const handleCategoryChange = (category) => setActiveCategory(category);

  return (
    <div>
      {/* 카테고리 탭 */}
      <div className="flex mb-4 gap-1">
        {animal.map((category) => (
          <button
            key={category}
            className={`w-[80px] p-1 cursor-pointer rounded-md ${activeCategory === category ? 'bg-[#FF983F] text-white' : 'bg-gray-200'}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category === 'all'
              ? '전체'
              : category === 'dog'
                ? '개'
                : category === 'cat'
                  ? '고양이'
                  : '기타'}
          </button>
        ))}
      </div>

      {/* 동물 카드 렌더링 */}
      <ul className="flex flex-wrap w-[100%] justify-start gap-6">
        {animals.length > 0 ? (
          animals.map((animal) => <RescueAnimalCard key={animal.desertionNo} animal={animal} />)
        ) : (
          <li>유기동물 정보가 없습니다.</li>
        )}
      </ul>
    </div>
  );
}

export default RescueAnimalList;
