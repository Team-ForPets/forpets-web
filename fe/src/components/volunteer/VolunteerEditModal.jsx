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
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
    bg-gray-100 text-black p-6 rounded-xl shadow-gray-300 shadow-lg z-10 w-[60vw]"
      onClick={handleModalOutsideClick}
    >
      <div ref={modalRef}>
        <form onSubmit={handleSubmit}>
          <section className="flex gap-3 flex-col border-2 rounded-xl border-gray p-7 ">
            <p className="text-2xl font-semibold text-center">이동봉사 수정</p>

            <section className="flex gap-10 mb-5">
              <section className="flex flex-col w-full gap-2">
                <section className="flex justify-between items-center gap-2">
                  <input
                    type="text"
                    name="title"
                    placeholder="제목"
                    value={editedVolunteer?.title || ''}
                    onChange={handleInputChange}
                    className="flex-1 border-1 rounded-xl p-2 border-gray"
                    required
                  />
                  <select
                    name="animalType"
                    value={editedVolunteer?.animalType || ''}
                    onChange={handleInputChange}
                    className="flex-1 border-1 rounded-xl p-2 border-gray"
                    required
                  >
                    <option value="">동물유형</option>
                    <option value="DOG">강아지</option>
                    <option value="CAT">고양이</option>
                    <option value="OTHER">기타</option>
                  </select>
                </section>

                <section className="flex justify-between items-center gap-2">
                  <input
                    type="text"
                    name="startDate"
                    placeholder="시작 날짜 YYYY-MM-DD"
                    value={editedVolunteer?.startDate || ''}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="flex-1 border-1 rounded-xl p-2 border-gray"
                    required
                  />
                  <input
                    type="text"
                    name="endDate"
                    placeholder="종료 날짜 YYYY-MM-DD"
                    value={editedVolunteer?.endDate || ''}
                    onChange={handleInputChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="flex-1 border-1 rounded-xl p-2 border-gray"
                    required
                  />
                </section>

                <section className="flex justify-between items-center gap-2">
                  <input
                    type="button"
                    name="departureArea"
                    value={editedVolunteer?.departureArea || '출발지역'}
                    onClick={handleAddressButtonClick('departureArea')}
                    className="flex-1 border-1 rounded-xl p-2 border-gray text-center placeholder-black cursor-pointer"
                    required
                  />
                  <input
                    type="button"
                    name="arrivalArea"
                    value={editedVolunteer?.arrivalArea || '도착지역'}
                    onClick={handleAddressButtonClick('arrivalArea')}
                    className="flex-1 border-1 rounded-xl p-2 border-gray text-center placeholder-black cursor-pointer"
                    required
                  />
                </section>
              </section>
            </section>

            <textarea
              name="notice"
              className="border-1 rounded-xl p-3 border-gray placeholder-black"
              placeholder="요청자에게 전하고 싶은 말"
              value={editedVolunteer?.notice || ''}
              onChange={handleInputChange}
            />

            <section className="flex justify-between">
              <button
                type="button"
                className="border-1 rounded-xl w-30 p-3 border-gray bg-primary text-white hover:bg-hover"
                onClick={handleCloseModal}
              >
                취소
              </button>
              <button
                type="submit"
                className="border-1 rounded-xl w-30 p-3 border-gray bg-primary text-white hover:bg-hover"
              >
                수정
              </button>
            </section>
          </section>
        </form>
      </div>
    </div>
  );
}

export default VolunteerEditModal;
