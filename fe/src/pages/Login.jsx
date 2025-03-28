import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
function Login() {
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
      dispatch(login({ accessToken, username }));
      navigate('/');
    } catch (error) {
      console.log('사용자 정보가 맞지 않습니다.');
      console.log(error);
      alert('사용자 정보가 맞지 않습니다.');
    }
  };
  const handleKakaoLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
  };
  const handleNaverLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/naver';
  };

  return (
    <>
      <form
        className="flex flex-col text-center w-[50%] m-auto gap-5 mt-[10%]"
        onSubmit={handleSubmitLogin}
      >
        <input
          className="h-10 p-2 border rounded-md"
          type="email"
          value={formData.username}
          placeholder="이메일"
          required
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input
          className="h-10 p-2 border rounded-md"
          type="password"
          placeholder="비밀번호"
          required
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button
          className="h-10 p-2 text-center border rounded-md bg-[#FF983F] text-[#ffffff] cursor-pointer"
          type="submit"
        >
          로그인
        </button>
        <button className="h-10 text-center  rounded-md cursor-pointer" onClick={handleKakaoLogin}>
          <img
            className="w-[100%] h-[100%] rounded-md overflow-hidden"
            src="/assets/kakao-login-button.png"
            alt=""
          />
        </button>
        <button className="h-10 text-center  rounded-md cursor-pointer" onClick={handleNaverLogin}>
          <img
            className="w-[100%] h-[100%] rounded-md overflow-hidden"
            src="/assets/naver-login-button.png"
            alt=""
          />
        </button>
        <Link
          className="w-[50%] h-10 p-2 border rounded-md  bg-[#FF983F] text-[#ffffff] m-auto"
          to="/signup"
        >
          회원가입
        </Link>
      </form>
    </>
  );
}

export default Login;
