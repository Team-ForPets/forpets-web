import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import api from '../api/authApi';

function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLogout = async () => {
    const response = await api.logout();
    dispatch(logout());
  };

  return (
    <header className="w-[60vw] h-[100px] m-auto  box-border flex justify-between items-center">
      <h1 className=" shrink-0 ">
        <Link to="/">
          <img className=" h-[50px]" src="/assets/forpets-logopng.png" alt="로고"></img>
        </Link>
      </h1>
      <nav className="flex">
        <ul className="flex gap-10">
          <li>
            <Link to="/">홈</Link>
          </li>
          <li>
            <Link to="/rescue-animal-list">구조동물</Link>
          </li>
          <li>
            <Link to="/service-status">이동봉사현황</Link>
          </li>
        </ul>
      </nav>
      <nav>
        <ul className="flex gap-5">
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/chat">나의채팅</Link>
              </li>
              <li>
                <Link to="/my">마이페이지</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="text-red-500 cursor-pointer">
                  로그아웃
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">로그인 / 회원가입</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
