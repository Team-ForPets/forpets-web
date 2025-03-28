import React from 'react';

function AnimalInfoModal({ myAnimal, onClose }) {
  if (!myAnimal) return null; // myAnimal이 없으면 모달 표시 X

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 cursor-pointer"
        >
          ✕
        </button>
        <div className="flex flex-col items-center gap-4">
          <img
            src={myAnimal.imageUrl || 'assets/forpets-marker-2.png'}
            alt={myAnimal.animalName}
            className="w-32 h-32 object-cover rounded-full border text-center"
          />
          <h2 className="text-2xl font-bold">{myAnimal.animalName}</h2>
          <p className="text-gray-600">
            {myAnimal.breed} / {myAnimal.animalType}
          </p>
          <p className="text-sm">체중: {myAnimal.weight}kg</p>
        </div>
        <div className="mt-4 p-4 bg-[#F5F5F5] rounded-lg">
          <p className="font-semibold">🚗 이동 경로</p>
          <p className="text-sm text-gray-600">
            {myAnimal.departureArea} → {myAnimal.arrivalArea}
          </p>
          <p className="font-semibold mt-3">🗒️ 특이사항</p>
          <p className="text-sm text-gray-600">{myAnimal.notice}</p>
          <p className="font-semibold mt-3">📌 메모</p>
          <p className="text-sm text-gray-600">{myAnimal.memo}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-[#FF983F] text-white rounded-md hover:bg-[#FF7A1F] transition-all"
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export default AnimalInfoModal;
