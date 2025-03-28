import React, { use, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainAnimalCard from '../components/MainAnimalCard';
import MainVolunteerCard from '../components/MainVolunteerCard';
import KakaoMap from '../components/KakaoMap';
import animalsApi from '../api/animalsApi';
import volunteersApi from '../api/volunteerApi';

function Home() {
  const [animals, setAnimals] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [activeTab, setActiveTab] = useState('animals');
  const [resetMarker, setResetMarker] = useState('animals');

  // 나의아이 리스트 불러오기
  const fetchAnimals = async () => {
    try {
      const response = await animalsApi.getAnimals();
      const data = response.data.animals;
      setAnimals(data);
    } catch (e) {
      console.error(e);
    }
  };

  // 봉사자 리스트 불러오기
  const fetchVolunteers = async () => {
    try {
      const response = await volunteersApi.getVolunteers();
      const data = response.data;
      setVolunteers(data);
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  // 페이지가 처음 로드될 때 데이터 가져오기
  useEffect(() => {
    fetchAnimals();
  }, []);

  // 요청자 버튼 클릭 시 animals 데이터 가져오기
  const handleAnimalList = () => {
    setActiveTab('animals');
    setResetMarker('animals');
    fetchAnimals();
  };

  // 봉사자 버튼 클릭 시 volunteer 데이터 가져오기
  const handleVolunteerList = () => {
    setActiveTab('volunteer');
    setResetMarker('volunteer');
    fetchVolunteers();
  };

  return (
    <main className="flex justify-between my-[10vh]">
      {/* 지도 섹션 (왼쪽) */}
      <section className="w-[65%] rounded-md">
        <KakaoMap animals={animals} volunteers={volunteers} resetMarker={resetMarker} />
      </section>

      {/* 카드 리스트 섹션 (오른쪽) */}
      <section className="w-[30%] flex flex-col">
        {/* 버튼 */}
        <article className="h-[5%] flex justify-between">
          <div className="w-[50%] flex gap-[3%]">
            <button
              onClick={handleAnimalList}
              className={`w-[100%] rounded-t-md cursor-pointer transition ${
                activeTab === 'animals' ? 'bg-[#FF771D] text-white' : 'bg-[#CCCBC8]'
              }`}
            >
              요청자
            </button>
            <button
              onClick={handleVolunteerList}
              className={`w-[100%] rounded-t-md cursor-pointer transition ${
                activeTab === 'volunteer' ? 'bg-[#FF771D] text-white' : 'bg-[#CCCBC8]'
              }`}
            >
              봉사자
            </button>
          </div>
          <button>
            <Link to={activeTab === 'animals' ? '/animal-list' : '/volunteer-list'}>더보기</Link>
          </button>
        </article>

        {/* 카드 리스트 (스크롤 가능) */}
        <article className="overflow-auto border bg-[#ece7e7] p-2 rounded-r-md h-[70vh]">
          <ul className="flex flex-col gap-3">
            {activeTab === 'animals' ? (
              animals && animals.length > 0 ? (
                animals.map((animal) => <MainAnimalCard key={animal.id} animal={animal} />)
              ) : (
                <p>동물 정보를 불러올 수 없습니다.</p>
              )
            ) : volunteers && volunteers.length > 0 ? (
              volunteers.map((volunteer) => (
                <MainVolunteerCard key={volunteer.id} volunteer={volunteer} />
              ))
            ) : (
              <p>봉사자 정보를 불러올 수 없습니다.</p>
            )}
          </ul>
        </article>
        <button className="w-[100%] p-3 bg-[#FF771D] text-white ">
          <Link to={activeTab === 'animals' ? 'register-animal' : 'register-volunteer'}>
            {activeTab === 'animals' ? '나의 아이 등록' : '봉사자 등록'}
          </Link>
        </button>
      </section>
    </main>
  );
}

export default Home;
