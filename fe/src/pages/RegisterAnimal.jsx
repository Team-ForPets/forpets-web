import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/forpetsLogo.png';
import { useDaumPostcodePopup } from 'react-daum-postcode';

function RegisterAnimal() {

  const postcodeScriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const [formData, setFormData] = useState({
    imageUrl: '',
    date: '',
    animalType: '',
    departureArea: '',
    arrivalArea: '',
    name: '',
    breed: '',
    weight: '',
    notice: '',
    memo: '',
  });

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    setFormData((prev) => ({ ...prev, date: today }));
    setFormData((prev) => ({ ...prev, imageUrl: logo }));
  }, []);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, imageUrl: imageUrl }));
    }
  };

  const handleComplete = (data, key) => {
    let fullAddress = data.address;
    console.log(fullAddress);
    setFormData((prev) => ({ ...prev, [key]: fullAddress }));
  };

  const handleClick = (e) => {
    const key = e.currentTarget.getAttribute('name');
    open({ onComplete: (addressData) => handleComplete(addressData, key) });
  };

  return (
    <>
      <nav className="flex justify-end gap-3 text-[#847D7D] mb-3">
        <Link to="/">홈</Link>
        <section>&gt;</section>
        <nav>이동 봉사요청 글 등록</nav>
      </nav>
      <form>
        <section className="flex flex-col border-2 rounded-xl border-gray p-10 h-[70vh]">
          <section className="flex gap-10">
            {/* <input type="file" className="border-1 rounded-xl border-gray w-[25vw] h-[35vh]" /> */}
            {/* <label
              htmlFor="imageInput"
              className="flex items-center justify-center cursor-pointer border-1 rounded-xl border-gray w-[25vw] h-[35vh] "
            >
              <input id="imageInput" type="file" className="hidden" accept="image/*" />
            </label> */}
            <label
              htmlFor="imageInput"
              className="flex items-center justify-center cursor-pointer border border-gray rounded-xl w-[25vw] h-[35vh]"
            >
              <img
                src={formData.imageUrl}
                alt="업로드된 이미지"
                className={`object-cover rounded-xl ${formData.imageUrl === logo ? 'h-[50%]' : 'w-full h-full'}`}
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
            <section className="flex flex-col w-[50%] h-[35vh] gap-2 text-center">
              <section className="flex flex-1 justify-between items-center gap-2">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={(e) => setDate(e.target.value)}
                  className="flex-1 border-1 rounded-xl p-3 border-gray"
                ></input>
                <select className="flex-1 border-1 rounded-xl p-3 border-gray">
                  <option value="">동물 유형</option>
                  <option value="DOG">강아지</option>
                  <option value="CAT">고양이</option>
                  <option value="OTHER">기타</option>
                </select>
              </section>
              <section className="flex flex-1 justify-between items-center gap-2">
                <section
                  type="button"
                  name="departureArea"
                  onClick={handleClick}
                  className="flex-1 border-1 rounded-xl p-3 border-gray"
                >
                  {formData.departureArea || "출발지역"}
                  <input type="text" name="departureArea" className="hidden" />
                </section>
                <section
                  type="button"
                  name="arrivalArea"
                  onClick={handleClick}
                  className="flex-1 border-1 rounded-xl p-3 border-gray"
                >
                  {formData.arrivalArea || "도착지역"}
                  <input type="text" name="arrivalArea" className="hidden" />
                </section>
              </section>
              <section className="flex flex-1 items-center justify-center border-1 rounded-xl border-gray">
                이름
              </section>
              <section className="flex flex-1 items-center justify-center border-1 rounded-xl border-gray">
                품종
              </section>
              <section className="flex flex-1 items-center justify-center border-1 rounded-xl border-gray">
                체중
              </section>
            </section>
          </section>

          <section className="border-1 rounded-xl p-3 mt-3 border-gray">특징 및 주의사항</section>
          <section className="border-1 rounded-xl p-3 mt-3 border-gray">
            봉사자에게 전하고 싶은 말
          </section>

          <section className="flex justify-between mt-auto">
            <button className="border-1 rounded-xl w-30 p-3 border-gray bg-primary text-white">
              공개
            </button>
            <button className="border-1 rounded-xl w-30 p-3 border-gray bg-primary text-white">
              등록
            </button>
          </section>
        </section>
      </form>
    </>
  );
}

export default RegisterAnimal;
