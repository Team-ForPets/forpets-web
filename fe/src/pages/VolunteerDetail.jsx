import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import volunteerApi from '../api/volunteerApi';
import DaumPost from '../components/DaumPost';

function VolunteerDetail() {
  const [volunteer, setVolunteer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedVolunteer, setEditedVolunteer] = useState(null);
  // const [errorMessages, setErrorMessages] = useState({});
  const [currentAddressField, setCurrentAddressField] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const modalRef = useRef(null);

  useEffect(() => {
    const getVolunteerDetail = async () => {
      try {
        const response = await volunteerApi.getVolunteerById(id);
        const data = response.data;
        setVolunteer(data);
      } catch (error) {
        console.error('Error fetching volunteers:', error);
      }
    };
    getVolunteerDetail();
  }, [id]);

  const handleChatStart = () => {
    navigate('/chat/rooms', {
      state: {
        volunteerId: id,
      },
    });
  };

  // 수정하기 버튼
  const handleEditClick = () => {
    setEditedVolunteer({...volunteer});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // 주소 검색 버튼 클릭 핸들러 - 바로 DaumPost 실행
  const handleAddressButtonClick = (fieldName) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentAddressField(fieldName);
    // 새 창에서 DaumPost 컴포넌트 열기 대신 직접 주소 검색 API 호출
    new window.daum.Postcode({
      oncomplete: function(data) {
        // 선택한 주소를 state에 설정
        const address = data.address || data.roadAddress || '';
        setEditedVolunteer(prev => ({
          ...prev,
          [fieldName]: address
        }));
      }
    }).open();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedVolunteer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await volunteerApi.updateVolunteer(id, editedVolunteer);
      setVolunteer(editedVolunteer);
      setShowModal(false);
    } catch (error) {
      console.error('수정하기 실패:', error);
    }
  };

  // 날짜 필드 포커스/블러 처리
  const handleFocus = (e) => (e.target.type = 'date');
  const handleBlur = (e) => !e.target.value && (e.target.type = 'text');

  const translateAnimalType = (animalType) => {
    switch (animalType) {
      case 'DOG':
        return '개';
      case 'CAT':
        return '고양이';
      case 'OTHER':
        return '기타';
      default:
        return animalType;
    }
  };

  // 모달 외부 클릭 이벤트 핸들러
  const handleModalOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleCloseModal();
    }
  };

  if (!volunteer) {
    return <p>봉사 정보가 없습니다.</p>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-md w-[100%] p-4 m-2 flex flex-col">
      <img
        src={volunteer.user.imageUrl || '/assets/person.jpeg'}
        alt="회원 이미지"
        className="rounded-xl w-full max-h-[80vh] mb-4"
      />
      <div className="space-y-4">
        <div className="flex items-center">
          <span className="font-semibold w-24 mr-2">제목</span>
          <span>{volunteer.title}</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold w-24 mr-2">닉네임</span>
          <span>{volunteer.user.nickName}</span>
        </div>

        <div className="flex items-center">
          <span className="font-semibold w-24 mr-2">시작일</span>
          <span>{volunteer.startDate}</span>
        </div>

        <div className="flex items-center">
          <span className="font-semibold w-24 mr-2">종료일</span>
          <span>{volunteer.endDate}</span>
        </div>

        <div className="flex items-center">
          <span className="font-semibold w-24 mr-2">출발 지역</span>
          <span>{volunteer.departureArea}</span>
        </div>

        <div className="flex items-center">
          <span className="font-semibold w-24 mr-2">도착 지역</span>
          <span>{volunteer.arrivalArea}</span>
        </div>

        <div className="flex items-center">
          <span className="font-semibold w-24 mr-2">봉사 가능 동물</span>
          <span>{translateAnimalType(volunteer.animalType)}</span>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex flex-col">
          <span className="font-semibold w-24 mb-2">전할 말</span>
          <div className="rounded-lg p-3 text-sm text-gray-700">{volunteer.notice}</div>
        </div>
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <button onClick={handleEditClick} className="bg-orange-500 text-white py-2 px-4 rounded-lg">
          수정하기
        </button>
        <button onClick={handleChatStart} className="bg-orange-500 text-white py-2 px-4 rounded-lg">
          채팅하기
        </button>
      </div>

      {/* 수정 모달 */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" onClick={handleModalOutsideClick}>
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
      )}

      {/* 주소 검색 팝업 컴포넌트는 제거하고 직접 API 사용 */}
    </div>
  );
}

export default VolunteerDetail;