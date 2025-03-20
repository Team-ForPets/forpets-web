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
       
        <div className="flex justify-end mb-4">
          <div className="text-gray-600">홈 &gt; 이동봉사자 등록 글</div>
        </div>

        <form onSubmit={handleSubmit} className="min-h-[600px] flex flex-col justify-between">
          <div className="space-y-6">
            {/* 제목과 동물유형을 나란히 배치 */}
            <div className="grid grid-cols-2 gap-6">
              {/* 제목 입력 */}
              <div>
                <label className="block text-sm font-medium mb-1">제목</label>
                <input
                  type="text"
                  name="title"
                  placeholder="제목을 입력해주세요"
                  className="w-full p-2 border rounded"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              {/* 동물유형 선택 */}
              <div>
                <label className="block text-sm font-medium mb-1">동물유형 선택</label>
                <select
                  name="animalType"
                  className="w-full p-2 border rounded"
                  value={formData.animalType}
                  onChange={handleChange}
                >
                  <option value="">동물유형 선택</option>
                  <option value="dog">개</option>
                  <option value="cat">고양이</option>
                  <option value="other">기타</option>
                </select>
              </div>
            </div>

            {/* 날짜 및 지역 입력 섹션 */}
            <div className="grid grid-cols-2 gap-6">
          
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

            
              <div>
                <label className="block text-sm font-medium mb-1">출발지역</label>
                <input
                  type="text"
                  name="departureArea"
                  placeholder="출발지역을 입력해주세요"
                  className="w-full p-2 border rounded"
                  value={formData.departureArea}
                  onChange={handleChange}
                />
              </div>

           
              <div>
                <label className="block text-sm font-medium mb-1">도착지역</label>
                <input
                  type="text"
                  name="arrivalArea"
                  placeholder="도착지역을 입력해주세요"
                  className="w-full p-2 border rounded"
                  value={formData.arrivalArea}
                  onChange={handleChange}
                />
              </div>
            </div>

        
            <div>
              <label className="block text-sm font-medium mb-1">요청자에게 전하고 싶은 말</label>
              <textarea
                name="message"
                placeholder="요청자에게 전하고 싶은 말을 입력해주세요"
                className="w-full p-2 border rounded h-40" // 높이 조정
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

         
          <div className="flex justify-end mt-8">
            <button type="submit" className="bg-orange-500 text-white px-8 py-2 rounded w-32">
              등록
            </button>
          </div>
        </form>
      </div>

      {/* 모달 */}
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
