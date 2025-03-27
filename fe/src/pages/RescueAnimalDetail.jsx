import React from 'react';
import { useLocation } from 'react-router-dom';

function RescueAnimalDetail() {
  const location = useLocation();
  const { animal } = location.state || {}; // 넘어온 state에서 animal 꺼내기
  console.log(animal);

  if (!animal) {
    return <p>동물 정보가 없습니다.</p>;
  }

  const {
    happenDt,
    happenPlace,
    age,
    kindNm,
    kindFullNm,
    colorCd,
    weight,
    popfile1,
    noticeSdt,
    noticeEdt,
    processState,
    sexCd,
    neuterYn,
    specialMark,
    careNm,
    careTel,
    careAddr,
    careOwnerNm,
    orgNm,
    updTm,
  } = animal;

  return (
    <div className="bg-white rounded-2xl shadow-md w-[100%] p-4 m-2 flex flex-col ">
      <img src={popfile1} alt="구조동물 사진" className="rounded-xl w-full max-h-[80vh]  mb-4" />

      <h2 className="text-lg font-bold text-gray-800 mb-2">{kindFullNm}</h2>
      <p className="text-sm text-gray-600 mb-1">
        🐾 <span className="font-semibold">발견날짜:</span> {happenDt}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        📍 <span className="font-semibold">발견장소:</span> {happenPlace}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        🗓️ <span className="font-semibold">구조날짜:</span> {age}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        🎨 <span className="font-semibold">색:</span> {colorCd}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        ⚖️ <span className="font-semibold">무게:</span> {weight}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        📢 <span className="font-semibold">공고:</span> {noticeSdt} ~ {noticeEdt}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        🚨 <span className="font-semibold">입양 상태:</span> {processState}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        ⚤ <span className="font-semibold">성별:</span> {sexCd === 'M' ? '♂️' : '♀️'}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        ✂️ <span className="font-semibold">중성화:</span> {neuterYn === 'Y' ? '✔️' : '✖️'}
      </p>
      <p className="text-sm text-gray-600 mb-1">
        📝 <span className="font-semibold">특징:</span> {specialMark}
      </p>

      <div className="mt-4 w-full bg-gray-100 p-2 rounded-lg">
        <h3 className="text-md font-semibold text-gray-700 mb-2">🏠 보호소 정보</h3>
        <p className="text-sm text-gray-600 mb-1">
          📛 <span className="font-semibold">이름:</span> {careNm}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          📞 <span className="font-semibold">전화번호:</span> {careTel}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          📍 <span className="font-semibold">주소:</span> {careAddr}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          👤 <span className="font-semibold">관리자:</span> {careOwnerNm}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          🏢 <span className="font-semibold">관할기관:</span> {orgNm}
        </p>
      </div>

      <p className="text-xs text-gray-400 mt-2">⏱️ 마지막 업데이트: {updTm}</p>
    </div>
  );
}

export default RescueAnimalDetail;
