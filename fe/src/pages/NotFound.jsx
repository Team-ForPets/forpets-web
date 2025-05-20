import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/forpetsLogo.png';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 p-6">
      <img src={logo} className="w-20 h-20 mb-4" />
      <h1 className="text-4xl font-bold mb-2">404 - 페이지를 찾을 수 없습니다</h1>
      <p className="text-lg text-gray-600 mb-6 text-center">
        요청하신 페이지가 존재하지 않거나 삭제되었어요.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-hover transition"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}

export default NotFound;
