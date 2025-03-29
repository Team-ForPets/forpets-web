import React from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function AnimalDetail() {
  const location = useLocation();
  const { animal } = location.state || {}; // 넘어온 state에서 animal 꺼내기
  console.log(animal);

  return (
    <div>
      <nav className="flex justify-end gap-3 text-[#847D7D] mb-3">
        <Link to="/animal-list">이동봉사 요청글 리스트</Link>
        <section>&gt;</section>
        <nav>이동 봉사요청 글 등록</nav>
      </nav>
      <section className="flex flex-col border-2 rounded-xl border-gray p-7 h-[70vh]">
        <section className="flex gap-10">
          <section
            className="flex items-center justify-center cursor-pointer border border-gray rounded-xl w-[25vw] h-[35vh]"
          >
            <img
              src={animal.imageUrl}
              alt="업로드된 이미지"
              className={`object-cover rounded-xl ${animal.imageUrl === '/src/assets/forpetsLogo.png' ? 'h-[50%]' : 'w-full h-full'}`}
            />
            {/* 동물정보 이름 나이 품종 체중 시작날짜 출발지역 도착지역 */}
          </section>
          <section className="flex flex-col w-[52%] h-[35vh] gap-2.5 ">
            <p className='text-2xl text-center'>동물정보</p>
            <p className='mt-4'>이름 : {animal.animalName}</p>
            <p>나이 : {animal.age}</p>
            <p>품종 : {animal.breed}</p>
            <p>체중 : {animal.weight}</p>
            <p>시작날짜 : {animal.selectedDate}</p>
            <p>출발지역 : {animal.departureArea}</p>
            <p>도착지역 : {animal.arrivalArea}</p>
            
          </section>
        </section>

        <p className='mt-5'>특징 및 주의사항</p>
        <p className='my-2'>: {animal.notice}</p>
        <p className='mt-3'>봉사자에게 전하고 싶은 말</p>
        <p className='my-2'>: {animal.memo}</p>

        <section className="flex justify-end gap-5 mt-5">
          <button
            name="isOpen"
            type="button"
            className="border-1 rounded-xl w-30 p-3 border-gray bg-primary text-white hover:bg-hover"
            // onClick={() => setFormData((prev) => ({ ...prev, isOpen: !prev.isOpen }))}
          >
            수정하기
          </button>
          <button
            type="button"
            className="border-1 rounded-xl w-30 p-3 border-gray bg-primary text-white hover:bg-hover"
            // onClick={showModal}
          >
            채팅하기
          </button>
        </section>
      </section>
      {/* <Modal
    // isOpen={modalIsOpen}
    // onRequestClose={closeModal}
    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
    bg-gray-100 text-black p-6 rounded-xl shadow-gray-300 shadow-lg z-10 w-[25vw] h-[30vh]"
  >
    <section className="flex flex-col justify-center items-center h-full">
      <p className="text-[22px] font-semibold mb-8">입력하신 정보가 맞습니까?</p>
    </section>
    <section className="absolute bottom-4 right-4 flex space-x-4">
      <button
        className="px-4 py-2 bg-gray-300 text-white rounded-xl hover:bg-gray-400"
        // onClick={closeModal}
      >
        취소
      </button>
      <button
        // type='button'
        // onClick={submit}
        className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-hover"
      >
        확인
      </button>
    </section>
  </Modal> */}
    </div>
  );
}

export default AnimalDetail