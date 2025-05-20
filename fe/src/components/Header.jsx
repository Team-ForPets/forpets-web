import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import api from '../api/authApi';
import { Menu } from 'lucide-react';

function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await api.logout();
    dispatch(logout());
  };

  return (
    <header className="w-[70vw] max-w-[70vw] h-[80px] flex justify-between items-center bg-white m-auto z-10 relative">
      <h1>
        <Link to="/">
          <img className="h-[50px]" src="/assets/forpets-logo.png" alt="로고" />
        </Link>
      </h1>

      {/* 데스크톱 네비게이션 */}
      <nav className="hidden xl:flex gap-20">
        <Link to="/" className="transition">
          홈
        </Link>
        <Link to="/rescue-animal-list" className="transition">
          구조동물
        </Link>
        <Link to="/volunteer-work-status" className="transition">
          이동봉사현황
        </Link>
      </nav>

      {/* 로그인 상태에 따른 메뉴 */}
      <div className="hidden xl:flex gap-5 items-center">
        {isLoggedIn ? (
          <>
            <Link to="/chat" className="transition flex items-center gap-2">
              <img src="/assets/forpettok.png" alt="포펫톡 이미지" className="w-[30px] h-[30px]" />
              <span>포펫톡</span>
            </Link>
            <Link to="/my" className="transition">
              마이페이지
            </Link>
            <button onClick={handleLogout} className="text-red-500 transition cursor-pointer">
              로그아웃
            </button>
          </>
        ) : (
          <Link to="/login" className="transition">
            로그인 / 회원가입
          </Link>
        )}
      </div>

      {/* 모바일 메뉴 버튼 */}
      <button className="xl:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        <Menu size={24} />
      </button>

      {/* 모바일 메뉴 */}
      {menuOpen && (
        <div className="absolute top-[80px] left-[50%] translate-x-[-50%] w-[60vw] bg-white shadow-md flex flex-col items-center  text-center xl:hidden">
          <Link
            to="/"
            className="w-full py-2 hover:bg-gray-200 transition"
            onClick={() => setMenuOpen(false)}
          >
            홈
          </Link>
          <Link
            to="/rescue-animal-list"
            className="w-full py-2 hover:bg-gray-200 transition"
            onClick={() => setMenuOpen(false)}
          >
            구조동물
          </Link>
          <Link
            to="/volunteer-work-status"
            className="w-full py-2 hover:bg-gray-200 transition"
            onClick={() => setMenuOpen(false)}
          >
            이동봉사현황
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                to="/chat"
                className="w-full py-2 hover:bg-gray-200 transition flex justify-center items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <img
                  src="/assets/forpettok.png"
                  alt="포펫톡 이미지"
                  className="w-[30px] h-[30px]"
                />
                <span>포펫톡</span>
              </Link>
              <Link
                to="/my"
                className="w-full py-2 hover:bg-gray-200 transition"
                onClick={() => setMenuOpen(false)}
              >
                마이페이지
              </Link>
              <button
                onClick={handleLogout}
                className="w-full py-2 text-red-500 hover:bg-gray-200 transition cursor-pointer"
              >
                로그아웃
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="w-full py-2 hover:bg-gray-200 transition"
              onClick={() => setMenuOpen(false)}
            >
              로그인 / 회원가입
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
