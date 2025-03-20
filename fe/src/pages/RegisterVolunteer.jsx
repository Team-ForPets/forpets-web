import React, { useState } from 'react';

function RegisterVolunteer() {
  const [formData, setFormData] = useState({
    title: '',
    animalType: '',
    startDate: '',
    endDate: '',
    departureArea: '',
    arrivalArea: '',
    message: '',
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirm = () => {
    // 여기에 실제 등록 로직 구현
    console.log('등록 데이터:', formData);
    setShowModal(false);
    // 등록 성공 후 처리 (예: 리다이렉트, 성공 메시지 등)
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleFocus = (e) => {
    if (e.target.name === 'startDate' || e.target.name === 'endDate') {
      e.target.type = 'date';
      e.target.showPicker(); // 날짜 선택기 바로 표시
    }
  };

  const handleBlur = (e) => {
    if (!e.target.value) {
      e.target.type = 'text';
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-gray-600 mb-4">홈 &gt; 이동 봉사자 글 등록</div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="title"
              placeholder="제목"
              className="border border-gray-300 p-2 rounded"
              value={formData.title}
              onChange={handleChange}
            />
            <select
              name="animalType"
              className="border border-gray-300 p-2 rounded"
              value={formData.animalType}
              onChange={handleChange}
            >
              <option value="">동물유형 선택</option>
              <option value="dog">개</option>
              <option value="cat">고양이</option>
              <option value="other">기타</option>
            </select>

            {/* 시작 날짜 */}
            <div>
              <label className="block text-sm font-medium mb-1">시작 날짜</label>
              <input
                type="text"
                name="startDate"
                placeholder="YYYY-MM-DD"
                className="w-full p-2 border rounded"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                onMouseOver={(e) => e.target.focus()} // 마우스 오버시 포커스
              />
            </div>

            {/* 출발 지역 */}
            <input
              type="text"
              name="departureArea"
              placeholder="출발지역"
              className="border border-gray-300 p-2 rounded"
              value={formData.departureArea}
              onChange={handleChange}
            />

            {/* 종료 날짜 */}
            <div>
              <label className="block text-sm font-medium mb-1">종료 날짜</label>
              <input
                type="text"
                name="endDate"
                placeholder="YYYY-MM-DD"
                className="w-full p-2 border rounded"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
                onMouseOver={(e) => e.target.focus()} // 마우스 오버시 포커스
              />
            </div>

            {/* 도착 지역 */}
            <input
              type="text"
              name="arrivalArea"
              placeholder="도착지역"
              className="border border-gray-300 p-2 rounded"
              value={formData.arrivalArea}
              onChange={handleChange}
            />
          </div>

          <div className="text-gray-600 mb-2">덧 붙이는 말</div>

          <textarea
            name="message"
            placeholder="봉사자에게 전하고 싶은 말:"
            className="w-full border border-gray-300 p-2 rounded mb-4"
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <div className="flex justify-end">
            <button type="submit" className="bg-orange-500 text-white px-8 py-2 rounded w-32">
              등록
            </button>
          </div>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full z-10">
            <div className="text-lg font-medium mb-4 text-center">이대로 등록하시겠습니까?</div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleConfirm}
                className="bg-orange-500 text-white px-4 py-2 rounded"
              >
                확인
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default RegisterVolunteer;
