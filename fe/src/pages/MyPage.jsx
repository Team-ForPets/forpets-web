import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import mypageApi from '../api/mypageApi';

function MyPage() {
  const [selectedButton, setSelectedButton] = useState('profile');

  const location = useLocation();
  const navigate = useNavigate();

  // 회원정보 get
  const fetchProfile = async () => {
    try {
      const response = await mypageApi.getProfile();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location.pathname === '/my' || location.pathname === '/my/profile') {
      setSelectedButton('profile');
    } else if (location.pathname === '/my/animals') {
      setSelectedButton('animals');
    } else if (location.pathname === '/my/volunteer-posts') {
      setSelectedButton('volunteer-posts');
    }
  }, [location.pathname]);

  // fetchProfile();

  const handleProfileRead = async () => {
    navigate('/my/profile');
  };

  const handleAnimalRead = async () => {
    navigate('/my/animals');
  };

  const handleVolunteerRead = async () => {
    navigate('/my/volunteer-posts');
  };

  return (
    <div className="h-[85%] flex gap-10 pt-10">
      {/* <div className="w-[25%] bg-gray-300 flex flex-col gap-10"> */}
      <aside className="w-[25%] flex flex-col gap-10 items-center pt-5">
        <button
          className={`w-[80%] px-4 py-3 bg-amber-300 cursor-pointer text-black rounded hover:bg-amber-500 transition-all ${selectedButton === 'profile' ? 'bg-amber-500' : 'bg-amber-300'}`}
          onClick={() => {
            setSelectedButton('profile');
            handleProfileRead();
          }}
        >
          프로필
        </button>
        <button
          className={`w-[80%] px-4 py-3 bg-amber-300 cursor-pointer text-black rounded hover:bg-amber-500 transition-all ${selectedButton === 'animals' ? 'bg-amber-500' : 'bg-amber-300'}`}
          onClick={() => {
            setSelectedButton('animals');
            handleAnimalRead();
          }}
        >
          나의 아이
        </button>
        <button
          className={`w-[80%] px-4 py-3 bg-amber-300 cursor-pointer text-black rounded hover:bg-amber-500 transition-all ${selectedButton === 'volunteer-posts' ? 'bg-amber-500' : 'bg-amber-300'}`}
          onClick={() => {
            setSelectedButton('volunteer-posts');
            handleVolunteerRead();
          }}
        >
          나의 봉사글
        </button>
      </aside>
      <main className="w-[75%] bg-gray-100 rounded border-2 border-gray-200">
        <Outlet></Outlet>
      </main>
    </div>
  );
}

export default MyPage;
