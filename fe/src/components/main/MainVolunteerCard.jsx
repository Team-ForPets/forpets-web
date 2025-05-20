import React from 'react';
import { useNavigate } from 'react-router-dom';
useNavigate;
function MainVolunteerCard({ volunteer }) {
  const { arrivalArea, departureArea, endDate, id, imageUrl, startDate, title } = volunteer;
  const navigate = useNavigate();
  const handleDetailPage = () => {
    navigate(`/volunteer-detail/${id}`);
  };
  return (
    <li
      className="flex flex-col sm:flex-row items-center gap-1 border rounded-md box-border bg-white cursor-pointer"
      onClick={handleDetailPage}
    >
      <div className="w-full sm:w-[30%] h-[150px] sm:h-[100px]">
        <img
          className="w-full h-full rounded-t-md sm:rounded-l-md sm:rounded-tr-none"
          src={imageUrl || '/assets/logo.png'}
          alt="이미지"
        />
      </div>
      <ul className="w-[70%] text-[12px]">
        <li>출발지: {departureArea}</li>
        <li>도착지: {arrivalArea}</li>
        <li>출발날짜: {startDate}</li>
        <li>도착날짜: {endDate}</li>
      </ul>
    </li>
  );
}

export default MainVolunteerCard;
