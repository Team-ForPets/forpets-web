import React from 'react';
import { Link } from 'react-router-dom';
function Login() {
  return (
    <>
      <form className="flex flex-col text-center w-[50%] m-auto gap-5 mt-[10%]">
        <input className="h-10 p-2 border rounded-md" type="text" placeholder="아이디" required />
        <input
          className="h-10 p-2 border rounded-md"
          type="password"
          placeholder="비밀번호"
          required
        />
        <button
          className="h-10 p-2 text-center border rounded-md bg-[#FF983F] text-[#ffffff] cursor-pointer"
          type="submit"
        >
          로그인
        </button>
        <button className="h-10 text-center  rounded-md cursor-pointer">
          <img
            className="w-[100%] h-[100%] rounded-md overflow-hidden"
            src="/assets/kakao-login-button.png"
            alt=""
          />
        </button>
        <button className="h-10 text-center  rounded-md cursor-pointer">
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
