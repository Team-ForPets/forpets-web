import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/forpetsLogo.png';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import animalsApi from '../../api/animalsApi';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function RegisterAnimal() {
  const postcodeScriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const open = useDaumPostcodePopup(postcodeScriptUrl);
  const navigate = useNavigate();

  const [animalData, setAnimalData] = useState({
    animalName: '',
    animalType: '',
    departureArea: '',
    arrivalArea: '',
    breed: '',
    age: '',
    weight: '',
    notice: '',
    memo: '',
    selectedDate: '',
    isOpen: false,
    isDelete: false,
  });

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    // 비로그인 접근 제한
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
    }

    const today = new Date().toISOString().slice(0, 10);
    setAnimalData((prev) => ({ ...prev, selectedDate: today }));
    setImageUrl(logo);
  }, []);

  useEffect(() => {
    console.log(image);
  }, [image]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInput = (e) => {
    setAnimalData({ ...animalData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImage(file);
      setImageUrl(imageUrl);
    }
  };

  // 다음 지오코딩 활용한 주소 입력
  const handleComplete = (data, key) => {
    let fullAddress = data.address;
    setAnimalData((prev) => ({ ...prev, [key]: fullAddress }));
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

      const jsonBlob = new Blob([JSON.stringify(animalData)], { type: 'application/json' });

      formData.append('data', jsonBlob); // JSON 데이터를 Blob 형태로 추가

      // 파일이 있을 경우에만 추가
      if (image) {
        formData.append('file', image);
      }

      const response = await animalsApi.createAnimal(formData);
      console.log(response);
      closeModal();
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <form>
        <section className="flex flex-col border-2 rounded-xl border-gray p-7 h-[70vh]">
          <section className="flex gap-10">
            <label
              htmlFor="imageInput"
              className="flex items-center justify-center cursor-pointer border border-gray rounded-xl w-[25vw] h-[35vh]"
            >
              <img
                src={imageUrl}
                alt="업로드된 이미지"
                className={`object-cover rounded-xl ${imageUrl === logo ? 'h-[50%]' : 'w-full h-full'}`}
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
                  value={animalData.selectedDate}
                  onChange={handleInput}
                  onClick={(e) => e.target.showPicker()}
                  className="flex-1 border-1 rounded-xl p-2 border-gray"
                  required
                ></input>
                <select
                  name="animalType"
                  className="flex-1 border-1 rounded-xl p-2 border-gray"
                  onChange={handleInput}
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
                  value={animalData.departureArea || '출발지역'}
                  onClick={handleClick}
                  required
                />
                <input
                  type="button"
                  name="arrivalArea"
                  className="flex-1 border-1 rounded-xl p-2 border-gray text-center placeholder-black"
                  value={animalData.arrivalArea || '도착지역'}
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
                value={animalData.animalName}
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
                value={animalData.breed}
                onChange={handleInput}
                required
              />
              <input
                type="number"
                name="age"
                className="flex flex-1 items-center justify-center border-1 rounded-xl [&::-webkit-outer-spin-button]:appearance-none 
                [&::-webkit-inner-spin-button]:appearance-none border-gray text-center placeholder-black"
                placeholder="나이"
                value={animalData.age}
                onChange={handleInput}
                required
              />
              <input
                type="number"
                name="weight"
                className="flex flex-1 items-center justify-center border-1 rounded-xl [&::-webkit-outer-spin-button]:appearance-none 
                [&::-webkit-inner-spin-button]:appearance-none border-gray text-center placeholder-black"
                placeholder="체중"
                value={animalData.weight}
                onChange={handleInput}
              />
            </section>
          </section>

          <textarea
            type="text"
            name="notice"
            className="border-1 rounded-xl p-3 mt-3 border-gray placeholder-black"
            placeholder="특징 및 주의사항"
            value={animalData.notice}
            onChange={handleInput}
          />
          <textarea
            type="text"
            name="memo"
            className="border-1 rounded-xl p-3 mt-3 border-gray placeholder-black"
            placeholder="봉사자에게 전하고 싶은 말"
            value={animalData.memo}
            onChange={handleInput}
          />

          <section className="flex justify-between mt-5">
            <button
              name="isOpen"
              type="button"
              className="border-1 rounded-xl w-30 p-3 border-gray bg-primary text-white hover:bg-hover"
              onClick={() => setAnimalData((prev) => ({ ...prev, isOpen: !prev.isOpen }))}
            >
              {animalData.isOpen ? '비공개' : '공개'}
            </button>
            <button
              type="button"
              className="border-1 rounded-xl w-30 p-3 border-gray bg-primary text-white hover:bg-hover"
              onClick={openModal}
            >
              등록
            </button>
          </section>
        </section>
      </form>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        bg-gray-100 text-black p-6 rounded-xl shadow-gray-300 shadow-lg z-10 w-[25vw] h-[30vh]"
      >
        <section className="flex flex-col justify-center items-center h-full">
          <p className="text-[22px] font-semibold mb-8">입력하신 정보가 맞습니까?</p>
        </section>
        <section className="absolute bottom-4 right-4 flex space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 text-white rounded-xl hover:bg-gray-400"
            onClick={closeModal}
          >
            취소
          </button>
          <button
            // type='button'
            onClick={submit}
            className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-hover"
          >
            확인
          </button>
        </section>
      </Modal>
    </>
  );
}

export default RegisterAnimal;
