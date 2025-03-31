import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import volunteerApi from '../api/volunteerApi';
import DaumPost from '../components/DaumPost';
import VolunteerEditModal from '../components/volunteer/VolunteerEditModal';
import VolunteerChatModal from '../components/volunteer/VolunteerChatModal';

function VolunteerDetail() {
  const [volunteer, setVolunteer] = useState(null);
  const [modalType, setModalType] = useState(null); // 'edit' 또는 'chat' 모달 타입 관리
  const [editedVolunteer, setEditedVolunteer] = useState(null);
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

  // 채팅 시작 핸들러
  const handleChatStart = () => {
    setModalType('chat'); // 채팅 모달 띄우기
  };

  // 수정하기 버튼 클릭 핸들러
  const handleEditClick = () => {
    setEditedVolunteer({ ...volunteer });
    setModalType('edit'); // 수정 모달 띄우기
  };

  const handleCloseModal = () => {
    setModalType(null); // 모달 닫기
  };

  // 주소 검색 버튼 클릭 핸들러
  const handleAddressButtonClick = (fieldName) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentAddressField(fieldName);
    new window.daum.Postcode({
      oncomplete: function (data) {
        const address = data.address || data.roadAddress || '';
        setEditedVolunteer((prev) => ({
          ...prev,
          [fieldName]: address,
        }));
      },
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
      setModalType(null); // 수정 후 모달 닫기
    } catch (error) {
      console.error('수정하기 실패:', error);
    }
  };

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
      {modalType === 'edit' && (
        <VolunteerEditModal
          handleModalOutsideClick={handleModalOutsideClick}
          modalRef={modalRef}
          handleSubmit={handleSubmit}
          editedVolunteer={editedVolunteer}
          handleInputChange={handleInputChange}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          handleAddressButtonClick={handleAddressButtonClick}
          handleCloseModal={handleCloseModal}
          volunteer
        ></VolunteerEditModal>
      )}

      {/* 채팅 모달 */}
      {modalType === 'chat' && (
        <VolunteerChatModal volunteerWorkId={volunteer.id} handleCloseModal={handleCloseModal} />
      )}
    </div>
  );
}

export default VolunteerDetail;
