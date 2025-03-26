import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

function MyPage() {
  const [selectedButton, setSelectedButton] = useState('profile');

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/my' || location.pathname === '/my/profile') {
      setSelectedButton('profile');
    } else if (location.pathname === '/my/animals') {
      setSelectedButton('animals');
    } else if (location.pathname === '/my/volunteer-posts') {
      setSelectedButton('volunteer-posts');
    }
  }, [location.pathname]);

  // 프로필 버튼 클릭 시 프로필 컴포넌트 표시
  const handleProfileRead = async () => {
    navigate('/my/profile');
  };

  // 나의 아이 버튼 클릭 시 나의 아이 컴포넌트 표시
  const handleAnimalRead = async () => {
    navigate('/my/animals');
  };

  // 나의 봉사글 버튼 클릭 시 나의 봉사글 컴포넌트 표시
  const handleVolunteerRead = async () => {
    navigate('/my/volunteer-posts');
  };

  return (
    <div className="h-[85%] flex gap-10 pt-10">
      <aside className="w-[25%] flex flex-col gap-10 items-center pt-5">
        <button
          className={`w-[80%] px-4 py-3 bg-amber-300 cursor-pointer text-black rounded hover:bg-amber-500 transition-all text-lg ${selectedButton === 'profile' ? 'bg-amber-500' : 'bg-amber-300'}`}
          onClick={() => {
            setSelectedButton('profile');
            handleProfileRead();
          }}
        >
          프로필
        </button>
        <button
          className={`w-[80%] px-4 py-3 bg-amber-300 cursor-pointer text-black rounded hover:bg-amber-500 transition-all text-lg ${selectedButton === 'animals' ? 'bg-amber-500' : 'bg-amber-300'}`}
          onClick={() => {
            setSelectedButton('animals');
            handleAnimalRead();
          }}
        >
          나의 아이
        </button>
        <button
          className={`w-[80%] px-4 py-3 bg-amber-300 cursor-pointer text-black rounded hover:bg-amber-500 transition-all text-lg ${selectedButton === 'volunteer-posts' ? 'bg-amber-500' : 'bg-amber-300'}`}
          onClick={() => {
            setSelectedButton('volunteer-posts');
            handleVolunteerRead();
          }}
        >
          나의 봉사글
        </button>
      </aside>
      <section className="w-[75%] bg-gray-100 rounded border-2 border-gray-200">
        <Outlet></Outlet>
      </section>
    </div>
  );
}

export default MyPage;
