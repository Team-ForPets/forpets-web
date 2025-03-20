import React from 'react';

function MainAnimalCard() {
  return (
    <li className="flex items-center gap-5 p-3 border rounded-md box-border bg-[#ffffff]">
      <div className="w-[30%] ">
        <img src="assets/logo.png" alt="나의아이 이미지" />
      </div>
      <ul>
        <li>출발: 어쩌구</li>
        <li>도착: 저쩌구</li>
        <li>품종: 고양이</li>
        <li>체중: 10kg</li>
      </ul>
    </li>
  );
}
export default MainAnimalCard;
