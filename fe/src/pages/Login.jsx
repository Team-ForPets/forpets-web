import React from 'react';
import { Link } from 'react-router-dom';
function Login() {
  return (
    <>
      <form className="flex flex-col text-center">
        <input className="text-center" type="text" placeholder="아이디" />
        <input className="text-center" type="password" placeholder="비밀번호" />
        <button type="submit">로그인</button>
        <button>카카오 로그인</button>
        <Link to="/signup">회원가입</Link>
      </form>
    </>
  );
}

export default Login;
