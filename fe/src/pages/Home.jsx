import React from 'react';
import { Link } from 'react-router-dom';
function Home() {
  return (
    <div>
      <h2>메인 홈 페이지입니다.</h2>
      <br />
      <Link className="bg-amber-300" to="/register-animal">
        나의 아이 등혹
      </Link>
      <Link className="bg-amber-500" to="/register-volunteer">
        봉사자 등록
      </Link>
    </div>
  );
}

export default Home;
