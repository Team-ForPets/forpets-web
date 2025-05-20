import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../../api/authApi';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';
function Login() {
  const VITE_SOCIAL_LOGIN_DOMAIN = import.meta.env.VITE_SOCIAL_LOGIN_DOMAIN;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authApi.login(formData);
      const username = formData.username;
      const accessToken = response.data.accessToken;
      const userId = response.data.userId;
      console.log(userId);

      dispatch(login({ accessToken, username, userId }));
      navigate('/');
    } catch (error) {
      console.log('사용자 정보가 맞지 않습니다.');
      console.log(error);
      alert('사용자 정보가 맞지 않습니다.');
    }
  };
  const handleKakaoLogin = () => {
    window.location.href = `${VITE_SOCIAL_LOGIN_DOMAIN}/oauth2/authorization/kakao`;
    // window.location.href = `http://localhost:8080/oauth2/authorization/kakao`;
  };
  const handleNaverLogin = () => {
    window.location.href = `${VITE_SOCIAL_LOGIN_DOMAIN}/oauth2/authorization/naver`;
  };

  return (
    <>
      <div className="flex flex-col text-center w-[100%] m-auto gap-3 mt-[10%] items-center">
        <form className="flex flex-col text-center w-[50%] gap-3" onSubmit={handleSubmitLogin}>
          <input
            className="h-13 p-2 border rounded-md"
            type="email"
            value={formData.username}
            placeholder="이메일"
            required
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          <input
            className="h-13 p-2 border rounded-md"
            type="password"
            placeholder="비밀번호"
            required
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button
            className="h-13 p-2 text-center border rounded-md bg-[#FF983F] text-[#ffffff] cursor-pointer"
            type="submit"
          >
            로그인
          </button>
        </form>
        <div className="w-[50%] flex justify-between m-auto">
          <button
            className="w-[49%] h-13 text-center  rounded-md cursor-pointer"
            onClick={handleKakaoLogin}
          >
            <img
              className="w-[100%] h-[100%] rounded-md overflow-hidden"
              src="/assets/kakao-login-button.png"
              alt=""
            />
          </button>
          <button
            className="w-[49%] h-13 text-center  rounded-md cursor-pointer"
            onClick={handleNaverLogin}
          >
            <img
              className="w-[100%] h-[100%] rounded-md overflow-hidden"
              src="/assets/naver-login-button.png"
              alt=""
            />
          </button>
        </div>
        <div className="flex justify-center w-[50%]">
          <Link
            to="/signup"
            className="w-[50%] h-13 p-2 border rounded-md bg-[#FF983F] text-[#ffffff] flex items-center justify-center cursor-pointer"
          >
            회원가입
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
