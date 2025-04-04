import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import logo from '../assets/forpetsLogo.png';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import Modal from 'react-modal';
import animalsApi from '../api/animalsApi';
import chatApi from '../api/chatApi';
Modal.setAppElement('#root');

function AnimalDetail() {
  const requestorId = parseInt(useSelector((state) => state.auth.user.id)); // userId 가져오기
  const postcodeScriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const open = useDaumPostcodePopup(postcodeScriptUrl);
  const location = useLocation();
  const navigate = useNavigate();
  const { animal } = location.state; // 넘어온 state에서 animal 꺼내기
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [detailData, setDetailData] = useState({ ...animal, isOpen: false });
  const [modalData, setModalData] = useState({ ...animal, isOpen: false });
  const [image, setImage] = useState(null);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInput = (e) => {
    console.log();

    setModalData({ ...modalData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      console.log(detailData);
      const imageUrl = URL.createObjectURL(file);
      setImage(file);
      setModalData((prev) => ({ ...prev, imageUrl: imageUrl }));
    }
  };

  // 다음 지오코딩 활용한 주소 입력
  const handleComplete = (data, key) => {
    let fullAddress = data.address;
    setModalData((prev) => ({ ...prev, [key]: fullAddress }));
  };

  // 다음 지오코딩 활용한 주소 입력
  const handleClick = (e) => {
    const key = e.currentTarget.getAttribute('name');
    open({ onComplete: (addressData) => handleComplete(addressData, key) });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      const jsonBlob = new Blob([JSON.stringify(modalData)], { type: 'application/json' });

      formData.append('data', jsonBlob);

      if (image) {
        formData.append('file', image);
      } else {
        formData.append('file', animal.imageUrl);
      }

      const response = await animalsApi.updateAnimal(animal.id, formData);
      setDetailData(modalData);
      console.log(response);
      closeModal();
      // navigate('/animal-detail');
    } catch (e) {
      console.log(e);
    }
  };
  console.log(animal.id);

  // 채팅방 생성
  const handleCreateChatRoom = async (e) => {
    e.preventDefault();
    const requestData = { myAnimalId: animal.id };
    console.log(requestData);
    try {
      const response = await chatApi.createChatRoom(requestData);
      console.log(response);
      navigate('/chat');
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <nav className="flex justify-end gap-3 text-[#847D7D] mb-3">
        <Link to="/animal-list">이동봉사 요청글 리스트</Link>
        <section>&gt;</section>
        <nav>이동 봉사요청 글 등록</nav>
      </nav>
      <section className="flex flex-col border-2 rounded-xl border-gray p-7 h-[70vh]">
        <section className="flex gap-10">
          <section className="flex items-center justify-center cursor-pointer border border-gray rounded-xl w-[25vw] h-[35vh]">
            <img
              src={detailData.imageUrl}
              alt="업로드된 이미지"
              className={`object-cover rounded-xl ${detailData.imageUrl === '/src/assets/forpetsLogo.png' ? 'h-[50%]' : 'w-full h-full'}`}
            />
            {/* 동물정보 이름 나이 품종 체중 시작날짜 출발지역 도착지역 */}
          </section>
          <section className="flex flex-col w-[52%] h-[35vh] gap-2.5 ">
            <p className="text-2xl text-center">동물정보</p>
            <p className="mt-4 font-medium">
              이름 : <span className="font-normal">{detailData.animalName}</span>
            </p>
            <p className="font-medium">
              나이 : <span className="font-normal">{detailData.age}</span>
            </p>
            <p className="font-medium">
              품종 : <span className="font-normal">{detailData.breed}</span>
            </p>
            <p className="font-medium">
              체중 : <span className="font-normal">{detailData.weight}</span>
            </p>
            <p className="font-medium">
              시작날짜 : <span className="font-normal">{detailData.selectedDate}</span>
            </p>
            <p className="font-medium">
              출발지역 : <span className="font-normal">{detailData.departureArea}</span>
            </p>
            <p className="font-medium">
              도착지역 : <span className="font-normal">{detailData.arrivalArea}</span>
            </p>
          </section>
        </section>

        <p className="mt-5 font-medium">특징 및 주의사항</p>
        <p className="my-2">: {detailData.notice}</p>
        <p className="mt-3 font-medium">봉사자에게 전하고 싶은 말</p>
        <p className="my-2">: {detailData.memo}</p>

        <section className="flex justify-end gap-5 mt-5">
          <button
            name="modify"
            type="button"
            className="border-1 rounded-xl w-30 p-3 border-gray bg-primary text-white hover:bg-hover"
            onClick={openModal}
          >
            수정하기
          </button>
          <button
            type="button"
            className="border-1 rounded-xl w-30 p-3 border-gray bg-primary text-white hover:bg-hover"
            onClick={handleCreateChatRoom}
          >
            채팅하기
          </button>
        </section>
      </section>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
    bg-gray-100 text-black p-6 rounded-xl shadow-gray-300 shadow-lg z-10 w-[60vw] h-[75vh]"
      >
        <form>
          <section className="flex flex-col border-2 rounded-xl border-gray p-7 h-[70vh]">
            <section className="flex gap-10">
              <label
                htmlFor="imageInput"
                className="flex items-center justify-center cursor-pointer border border-gray rounded-xl w-[25vw] h-[35vh]"
              >
                <img
                  src={modalData.imageUrl}
                  alt="업로드된 이미지"
                  className={`object-cover rounded-xl ${modalData.imageUrl === logo ? 'h-[50%]' : 'w-full h-full'}`}
                />
                <input
                  id="imageInput"
                  name="imageUrl"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
              <section className="flex flex-col w-[52%] h-[35vh] gap-2 text-center">
                <section className="flex flex-1 justify-between items-center gap-2">
                  <input
                    type="date"
                    name="selectedDate"
                    value={modalData.selectedDate}
                    onChange={handleInput}
                    onClick={(e) => e.target.showPicker()}
                    className="flex-1 border-1 rounded-xl p-2 border-gray"
                    required
                  ></input>
                  <select
                    name="animalType"
                    className="flex-1 border-1 rounded-xl p-2 border-gray"
                    onChange={handleInput}
                    value={modalData.animalType}
                    required
                  >
                    <option value="">동물 유형</option>
                    <option value="DOG">강아지</option>
                    <option value="CAT">고양이</option>
                    <option value="OTHER">기타</option>
                  </select>
                </section>
                <section className="flex flex-1 justify-between items-center gap-2">
                  <input
                    type="button"
                    name="departureArea"
                    className="flex-1 border-1 rounded-xl p-2 border-gray text-center placeholder-black"
                    value={modalData.departureArea || '출발지역'}
                    onClick={handleClick}
                    required
                  />
                  <input
                    type="button"
                    name="arrivalArea"
                    className="flex-1 border-1 rounded-xl p-2 border-gray text-center placeholder-black"
                    value={modalData.arrivalArea || '도착지역'}
                    onClick={handleClick}
                    required
                  />
                </section>
                <input
                  type="text"
                  name="animalName"
                  className="flex flex-1 items-center justify-center border-1 rounded-xl border-gray text-center placeholder-black"
                  placeholder="이름"
                  minLength="1"
                  maxLength="10"
                  value={modalData.animalName}
                  onChange={handleInput}
                  required
                />
                <input
                  type="text"
                  name="breed"
                  className="flex flex-1 items-center justify-center border-1 rounded-xl border-gray text-center placeholder-black"
                  placeholder="품종"
                  minLength="1"
                  maxLength="10"
                  value={modalData.breed}
                  onChange={handleInput}
                  required
                />
                <input
                  type="number"
                  name="age"
                  className="flex flex-1 items-center justify-center border-1 rounded-xl [&::-webkit-outer-spin-button]:appearance-none 
                [&::-webkit-inner-spin-button]:appearance-none border-gray text-center placeholder-black"
                  placeholder="나이"
                  value={modalData.age}
                  onChange={handleInput}
                  required
                />
                <input
                  type="number"
                  name="weight"
                  className="flex flex-1 items-center justify-center border-1 rounded-xl [&::-webkit-outer-spin-button]:appearance-none 
                [&::-webkit-inner-spin-button]:appearance-none border-gray text-center placeholder-black"
                  placeholder="체중"
                  value={modalData.weight}
                  onChange={handleInput}
                />
              </section>
            </section>

            <textarea
              type="text"
              name="notice"
              className="border-1 rounded-xl p-3 mt-3 border-gray placeholder-black"
              placeholder="특징 및 주의사항"
              value={modalData.notice}
              onChange={handleInput}
            />
            <textarea
              type="text"
              name="memo"
              className="border-1 rounded-xl p-3 mt-3 border-gray placeholder-black"
              placeholder="봉사자에게 전하고 싶은 말"
              value={modalData.memo}
              onChange={handleInput}
            />

            <section className="flex justify-between mt-5">
              <button
                name="isOpen"
                type="button"
                className="border-1 rounded-xl w-30 p-3 border-gray bg-primary text-white hover:bg-hover"
                onClick={() => setDetailData((prev) => ({ ...prev, isOpen: !prev.isOpen }))}
              >
                {modalData.isOpen ? '비공개' : '공개'}
              </button>
              <section className="flex gap-5">
                <button
                  className="px-4 py-2 bg-gray-300 text-white rounded-xl hover:bg-gray-400"
                  onClick={closeModal}
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="border-1 rounded-xl w-30 p-3 border-gray bg-primary text-white hover:bg-hover"
                  onClick={submit}
                >
                  수정
                </button>
              </section>
            </section>
          </section>
        </form>
      </Modal>
    </div>
  );
}

export default AnimalDetail;
