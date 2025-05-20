import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import logo from '../../assets/forpetsLogo.png';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import Modal from 'react-modal';
import animalsApi from '../../api/animalsApi';
import chatApi from '../../api/chatApi';
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

  const InfoItem = ({ label, value }) => (
    <p className="text-gray-600 text-sm md:text-base">
      <span className="font-medium">{label} :</span> <span className="ml-1">{value}</span>
    </p>
  );

  return (
    <div>
      <section className="flex flex-col gap-6 border border-gray-200 rounded-2xl p-6 shadow-md bg-white max-w-6xl mx-auto">
        {/* 상단 정보 영역 */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* 이미지 */}
          <div className="flex-shrink-0 w-full md:w-[25vw] h-[35vh] border border-gray-300 rounded-xl overflow-hidden flex items-center justify-center">
            <img
              src={detailData.imageUrl}
              alt="업로드된 이미지"
              className={`${detailData.imageUrl === '/src/assets/forpetsLogo.png' ? 'h-[50%]' : 'w-full h-full'}`}
            />
          </div>

          {/* 텍스트 정보 */}
          <div className="flex flex-col justify-center gap-2 w-full">
            <h2 className="text-xl font-semibold text-center md:text-left">동물 정보</h2>

            <InfoItem label="이름" value={detailData.animalName} />
            <InfoItem label="나이" value={detailData.age} />
            <InfoItem label="품종" value={detailData.breed} />
            <InfoItem label="체중" value={detailData.weight} />
            <InfoItem label="시작날짜" value={detailData.selectedDate} />
            <InfoItem label="출발지역" value={detailData.departureArea} />
            <InfoItem label="도착지역" value={detailData.arrivalArea} />
          </div>
        </div>

        {/* 상세 내용 */}
        <div>
          <p className="text-lg font-semibold text-gray-700 mb-2">특징 및 주의사항</p>
          <p className="text-gray-600 whitespace-pre-wrap">{detailData.notice}</p>
        </div>

        <div>
          <p className="text-lg font-semibold text-gray-700 mb-2">봉사자에게 전하고 싶은 말</p>
          <p className="text-gray-600 whitespace-pre-wrap">{detailData.memo}</p>
        </div>

        {/* 버튼 영역 */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="px-5 py-2 rounded-lg bg-primary text-white hover:bg-hover transition-colors"
            onClick={openModal}
          >
            수정하기
          </button>
          <button
            className="px-5 py-2 rounded-lg bg-primary text-white hover:bg-hover transition-colors"
            onClick={handleCreateChatRoom}
          >
            채팅하기
          </button>
        </div>
      </section>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
    bg-gray-100 text-black p-6 rounded-xl shadow-gray-300 shadow-lg z-10 w-[60vw] h-[75vh]"
      >
        <form>
          <section className="flex justify-between flex-col border-2 rounded-xl border-gray p-7 h-[70vh]">
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
              className="border-1 rounded-xl p-3 border-gray placeholder-black"
              placeholder="특징 및 주의사항"
              value={modalData.notice}
              onChange={handleInput}
            />
            <textarea
              type="text"
              name="memo"
              className="border-1 rounded-xl p-3 border-gray placeholder-black"
              placeholder="봉사자에게 전하고 싶은 말"
              value={modalData.memo}
              onChange={handleInput}
            />

            <section className="flex justify-between">
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
