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
    <>
      <div className="h-[90%] flex gap-15 pt-10">
        {/* <div className="w-[25%] bg-gray-300 flex flex-col gap-10"> */}
        <div className="w-[25%] flex flex-col gap-10 items-center">
          <button
            className={`w-[80%] px-4 py-3 bg-amber-300 text-black rounded hover:bg-amber-500 transition-all active:scale-110 ${selectedButton === 'profile' ? 'bg-amber-500' : 'bg-amber-300'}`}
            onClick={() => {
              setSelectedButton('profile');
              handleProfileRead();
            }}
          >
            프로필
          </button>
          <button
            className={`w-[80%] px-4 py-3 bg-amber-300 text-black rounded hover:bg-amber-500 transition-all active:scale-110 ${selectedButton === 'animals' ? 'bg-amber-500' : 'bg-amber-300'}`}
            onClick={() => {
              setSelectedButton('animals');
              handleAnimalRead();
            }}
          >
            나의 아이
          </button>
          <button
            className={`w-[80%] px-4 py-3 bg-amber-300 text-black rounded hover:bg-amber-500 transition-all active:scale-110 ${selectedButton === 'volunteer-posts' ? 'bg-amber-500' : 'bg-amber-300'}`}
            onClick={() => {
              setSelectedButton('volunteer-posts');
              handleVolunteerRead();
            }}
          >
            나의 봉사글
          </button>
        </div>
        <div className="w-[75%] bg-gray-300 rounded">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}

export default MyPage;
