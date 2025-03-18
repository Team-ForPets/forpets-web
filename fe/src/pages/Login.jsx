import React from 'react';
import { Link } from 'react-router-dom';
function Login() {
  return (
    <div>
      로그인 페이지야~~~~~~~~~
      <Link to="/signup" >회원가입 페이지 이동</Link>
    </div>
  );
}

export default Login;
