import React from 'react';
import { Link } from 'react-router-dom';
import MainAnimalCard from '../components/MainAnimalCard';
import KakaoMap from '../components/KakaoMap';

function Home() {
  return (
    <div className="flex h-[90%] justify-between mt-[3%]">
      {/* 지도 섹션 (왼쪽) */}
      <section className="w-[50%] rounded-md bg-amber-200 ">
        <KakaoMap></KakaoMap>
      </section>

      {/* 카드 리스트 섹션 (오른쪽) */}
      <section className="w-[45%] flex flex-col">
        {/* 버튼 */}
        <article className="h-[15%] flex justify-between ">
          <div className="w-[50%] flex gap-[3%]">
            <button className="bg-amber-300 w-[100%]  rounded-t-md">요청자</button>
            <button className="bg-amber-500 w-[100%]  rounded-t-md">봉사자</button>
          </div>
          <button>
            <Link to="/volunteer-List">더보기</Link>
          </button>
        </article>

        {/* 카드 리스트 (스크롤 가능) */}
        <article className="overflow-auto border bg-[#ece7e7] p-2 rounded-r-md">
          <ul className="flex flex-col gap-3 ">
            <MainAnimalCard />
            <MainAnimalCard />
            <MainAnimalCard />
            <MainAnimalCard />
            <MainAnimalCard />
            <MainAnimalCard />
            <MainAnimalCard />
            <MainAnimalCard />
            <MainAnimalCard />
          </ul>
        </article>
        <article>
          {/* 등록버튼 변경예정 */}
          <button className="bg-amber-300 p-3 w-[50%] h-[100%]">
            <Link className="block" to="/register-animal">
              나의 아이 등록
            </Link>
          </button>
          <button className="bg-amber-500 p-3 w-[50%] h-[100%]">
            <Link className="block" to="/register-volunteer">
              봉사자 등록
            </Link>
          </button>
        </article>
      </section>
    </div>
  );
}

export default Home;
