import React, { use, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainAnimalCard from '../components/main/MainAnimalCard';
import MainVolunteerCard from '../components/main/MainVolunteerCard';
import KakaoMap from '../components/main/KakaoMap';
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
  const handleAnimalList = (e) => {
    e.preventDefault();
    setActiveTab('animals');
    setResetMarker('animals');
    fetchAnimals();
  };

  // 봉사자 버튼 클릭 시 volunteer 데이터 가져오기
  const handleVolunteerList = (e) => {
    e.preventDefault();
    setActiveTab('volunteer');
    setResetMarker('volunteer');
    fetchVolunteers();
  };

  return (
    <main className="flex flex-col md:flex-row h-auto md:h-[70vh] justify-between mt-[2vh] mb-[5vh] gap-4 md:gap-0">
      {/* 지도 섹션 (위쪽 또는 왼쪽) */}
      <section className="w-full md:w-[68%] h-[300px] md:h-full rounded-md relative mb-4 md:mb-0">
        <div className="w-full h-full">
          <KakaoMap animals={animals} volunteers={volunteers} resetMarker={resetMarker} />
        </div>
      </section>

      {/* 카드 리스트 섹션 (아래쪽 또는 오른쪽) */}
      <section className="w-full md:w-[30%] max-h-[70vh] flex flex-col relative">
        {/* 버튼 영역 */}
        <article className="h-[40px] flex justify-between">
          <div className="w-[70%] flex gap-[3%]">
            <button
              onClick={(e) => handleAnimalList(e)}
              className={`w-full text-[14px] rounded-t-md cursor-pointer transition ${
                activeTab === 'animals' ? 'bg-[#FF771D] text-white' : 'bg-[#CCCBC8]'
              }`}
            >
              요청자
            </button>
            <button
              onClick={(e) => handleVolunteerList(e)}
              className={`w-full text-[14px] rounded-t-md cursor-pointer transition ${
                activeTab === 'volunteer' ? 'bg-[#FF771D] text-white' : 'bg-[#CCCBC8]'
              }`}
            >
              봉사자
            </button>
          </div>
          <button>
            <Link
              className="text-gray-500"
              to={activeTab === 'animals' ? '/animal-list' : '/volunteer-list'}
            >
              더보기
            </Link>
          </button>
        </article>

        {/* 카드 리스트 */}
        <article className="overflow-auto border bg-[#ece7e7] p-2 rounded-md flex-grow flex flex-col">
          <ul className="flex flex-col gap-3 flex-grow overflow-y-auto pb-14">
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

          {/* 하단 고정 버튼 */}
          <button className="bg-[#ff983f] text-black rounded-md sticky bottom-0">
            <Link
              className="w-full p-3 block rounded-md hover:bg-[#FF771D] hover:text-white"
              to={activeTab === 'animals' ? 'register-animal' : 'register-volunteer'}
            >
              {activeTab === 'animals' ? '나의 아이 등록' : '봉사자 등록'}
            </Link>
          </button>
        </article>
      </section>
    </main>
  );
}

export default Home;
