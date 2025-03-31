import React from 'react';
import DaumPost from '../DaumPost';

function VolunteerEditModal({
  modalRef,
  handleModalOutsideClick,
  handleSubmit,
  editedVolunteer,
  handleInputChange,
  handleFocus,
  handleBlur,
  handleAddressButtonClick,
  handleCloseModal,
}) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={handleModalOutsideClick}
    >
      {/* <div className="absolute inset-0 bg-black bg-opacity-50"></div> */}
      <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl z-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* 제목 입력 */}
            <div>
              <label className="block text-xl font-medium mb-1">제목</label>
              <input
                type="text"
                name="title"
                value={editedVolunteer?.title || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* 동물유형 선택 */}
            <div>
              <label className="block text-xl font-medium mb-1">동물유형 선택</label>
              <select
                name="animalType"
                value={editedVolunteer?.animalType || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="DOG">개</option>
                <option value="CAT">고양이</option>
                <option value="OTHER">기타</option>
              </select>
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
                value={editedVolunteer?.startDate || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* 종료 날짜 */}
            <div>
              <label className="block text-xl font-medium mb-1">종료 날짜</label>
              <input
                type="text"
                name="endDate"
                placeholder="YYYY-MM-DD"
                value={editedVolunteer?.endDate || ''}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* 출발지 주소 - 직접 Daum 우편번호 API 호출 */}
            <div>
              <label className="block text-xl font-medium mb-1">출발 지역</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleAddressButtonClick('departureArea')}
                  className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                >
                  주소 검색
                </button>
                <input
                  type="text"
                  name="departureArea"
                  placeholder="출발지역를 검색해주세요"
                  value={editedVolunteer?.departureArea || ''}
                  className="flex-1 p-2 border rounded"
                  readOnly
                />
              </div>
            </div>

            {/* 도착지 주소 - 직접 Daum 우편번호 API 호출 */}
            <div>
              <label className="block text-xl font-medium mb-1">도착 지역</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleAddressButtonClick('arrivalArea')}
                  className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                >
                  주소 검색
                </button>
                <input
                  type="text"
                  name="arrivalArea"
                  placeholder="도착지역을 검색해주세요"
                  value={editedVolunteer?.arrivalArea || ''}
                  className="flex-1 p-2 border rounded"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* 요청사항 */}
          <div>
            <label className="block text-xl font-medium mb-1">요청자에게 전하고 싶은 말</label>
            <textarea
              name="notice"
              placeholder="요청자에게 전하고 싶은 말을 입력해주세요"
              value={editedVolunteer?.notice || ''}
              onChange={handleInputChange}
              className="w-full p-2 border rounded h-40"
            />
          </div>

          {/* 버튼 영역 */}
          <div className="flex justify-center space-x-4 mt-6">
            <button type="submit" className="bg-orange-500 text-white px-8 py-2 rounded w-32">
              확인
            </button>
            <button
              type="button"
              onClick={handleCloseModal}
              className="bg-gray-300 text-gray-700 px-8 py-2 rounded w-32"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VolunteerEditModal;
