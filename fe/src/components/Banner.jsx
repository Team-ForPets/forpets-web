import React from 'react';
import { useLocation } from 'react-router-dom';

function Banner() {
  const location = useLocation();

  // /home이 아니면 렌더링하지 않음
  if (location.pathname !== '/') {
    return null;
  }

  return (
    <div>
      <img className="w-[100%] h-[70%] max-h-[70vh]" src="/assets/banner.png" alt="배너이미지" />
    </div>
  );
}

export default Banner;
