import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import volunteerApi from '../../api/volunteerApi';
import DaumPost from '../../components/main/DaumPost';

function RegisterVolunteer() {
  const [formData, setFormData] = useState({
    title: '',
    animalType: '',
    startDate: '',
    endDate: '',
    departureArea: '', // 출발지 주소
    arrivalArea: '', // 도착지 주소
    notice: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessages[name]) setErrorMessages((prev) => ({ ...prev, [name]: '' }));
  };

  // 다음 주소 검색 완료 시 처리
  const handleComplete = (data, key) => {
    const fullAddress = data.address;
    setFormData((prev) => ({ ...prev, [key]: fullAddress }));
    if (errorMessages[key]) setErrorMessages((prev) => ({ ...prev, [key]: '' }));
  };

  // 버튼 클릭 시 다음 주소 검색창 열기
  const handleClick = (e) => {
    const key = e.currentTarget.getAttribute('name');
    new window.daum.Postcode({
      oncomplete: (data) => handleComplete(data, key),
    }).open();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 필수 필드 검증
    const errors = {};
    const requiredFields = [
      'title',
      'animalType',
      'startDate',
      'endDate',
      'departureArea',
      'arrivalArea',
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) errors[field] = '필수 입력 항목입니다.';
    });

    if (!formData.animalType || formData.animalType === '') {
      errors.animalType = '동물유형을 선택해주세요';
    }

    // 날짜 유효성 검사
    if (
      formData.startDate &&
      formData.endDate &&
      new Date(formData.startDate) > new Date(formData.endDate)
    ) {
      errors.endDate = '종료일은 시작일 이후여야 합니다';
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

    setShowModal(true);
  };

  const handleConfirm = async () => {
    try {
      await volunteerApi.createVolunteer(formData);
      navigate('/');
    } catch (error) {
      console.error('등록 실패:', error);
      alert('등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setShowModal(false);
    }
  };
  const handleCancel = () => {
    setShowModal(false);
  };

  // 날짜 필드 포커스/블러 처리
  const handleFocus = (e) => (e.target.type = 'date');
  const handleBlur = (e) => !e.target.value && (e.target.type = 'text');

  console.log(formData);

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="bg-white p-7 rounded-xl border-2 border-gray shadow-md">
        <form onSubmit={handleSubmit} className="min-h-[600px] flex flex-col justify-between">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* 제목 입력 */}
              <div>
                <label className="block text-xl font-medium mb-1">제목</label>
                <input
                  type="text"
                  name="title"
                  placeholder="제목을 입력해주세요"
                  className={`w-full p-3 border rounded-xl border-gray placeholder-black ${
                    errorMessages.title ? 'border-red-500' : ''
                  }`}
                  value={formData.title}
                  onChange={handleChange}
                />
                {errorMessages.title && (
                  <div className="text-red-500 text-xs mt-1">{errorMessages.title}</div>
                )}
              </div>

              {/* 동물유형 선택 */}
              <div>
                <label className="block text-xl font-medium mb-1">동물유형 선택</label>
                <select
                  name="animalType"
                  className={`w-full p-3 border rounded-xl border-gray placeholder-black ${
                    errorMessages.animalType ? 'border-red-500' : ''
                  }`}
                  value={formData.animalType}
                  onChange={handleChange}
                >
                  <option value="">동물유형 선택</option>
                  <option value="DOG">개</option>
                  <option value="CAT">고양이</option>
                  <option value="OTHER">기타</option>
                </select>
                {errorMessages.animalType && (
                  <div className="text-red-500 text-xs mt-1">{errorMessages.animalType}</div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* 시작 날짜 */}
              <div>
                <label className="block text-xl font-medium mb-1">시작 날짜</label>
                <input
                  type="text"
                  name="startDate"
                  placeholder="YYYY-MM-DD"
                  className={`w-full p-3 border rounded-xl border-gray placeholder-black ${
                    errorMessages.startDate ? 'border-red-500' : ''
                  }`}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errorMessages.startDate && (
                  <div className="text-red-500 text-xs mt-1">{errorMessages.startDate}</div>
                )}
              </div>

              {/* 종료 날짜 */}
              <div>
                <label className="block text-xl font-medium mb-1">종료 날짜</label>
                <input
                  type="text"
                  name="endDate"
                  placeholder="YYYY-MM-DD"
                  className={`w-full p-3 border rounded-xl border-gray placeholder-black ${
                    errorMessages.endDate ? 'border-red-500' : ''
                  }`}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errorMessages.endDate && (
                  <div className="text-red-500 text-xs mt-1">{errorMessages.endDate}</div>
                )}
              </div>

              {/* 주소 검색 */}
              <section className="col-span-2 flex gap-6">
                <input
                  type="button"
                  name="departureArea"
                  className={`flex-1 border-2 rounded-xl p-3 border-gray text-center placeholder-black ${
                    errorMessages.departureArea ? 'border-red-500' : ''
                  }`}
                  value={formData.departureArea || '출발지역'}
                  onClick={handleClick}
                  required
                />
                <input
                  type="button"
                  name="arrivalArea"
                  className={`flex-1 border-2 rounded-xl p-3 border-gray text-center placeholder-black ${
                    errorMessages.arrivalArea ? 'border-red-500' : ''
                  }`}
                  value={formData.arrivalArea || '도착지역'}
                  onClick={handleClick}
                  required
                />
              </section>
              {errorMessages.departureArea && (
                <div className="text-red-500 text-xs mt-1 col-span-2">
                  {errorMessages.departureArea}
                </div>
              )}
              {errorMessages.arrivalArea && (
                <div className="text-red-500 text-xs mt-1 col-span-2">
                  {errorMessages.arrivalArea}
                </div>
              )}
            </div>

            {/* 요청사항 */}
            <div>
              <label className="block text-xl font-medium mb-1">요청자에게 전하고 싶은 말</label>
              <textarea
                name="notice"
                placeholder="요청자에게 전하고 싶은 말을 입력해주세요"
                className="w-full p-3 border-2 rounded-xl border-gray h-40 placeholder-black"
                value={formData.notice}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* 등록 버튼 */}
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="bg-primary text-white px-8 py-3 rounded-xl hover:bg-hover w-32"
            >
              등록
            </button>
          </div>
        </form>
      </section>

      {/* 확인 모달 */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-lg max-w-md w-full z-10">
            <div className="text-lg font-medium mb-6 text-center">이대로 등록하시겠습니까?</div>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleConfirm}
                className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-hover"
              >
                확인
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-black px-4 py-2 rounded-xl hover:bg-gray-400"
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
