import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import volunteerApi from '../../api/volunteerApi';
import DaumPost from '../../components/main/DaumPost';
import VolunteerEditModal from '../../components/volunteer/VolunteerEditModal';
import VolunteerChatModal from '../../components/volunteer/VolunteerChatModal';

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

  function InfoItem({ label, value }) {
    return (
      <div className="flex text-sm md:text-base text-gray-700">
        <span className="w-28 font-medium">{label}:</span>
        <span>{value}</span>
      </div>
    );
  }

  return (
    <div>
      <section className="flex flex-col gap-6 border border-gray-200 rounded-2xl p-6 shadow-md bg-white max-w-6xl mx-auto">
        {/* 상단 정보 영역 */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* 이미지 */}
          <div className="flex-shrink-0 w-full md:w-[25vw] h-[35vh] border border-gray-300 rounded-xl overflow-hidden">
            <img
              src={volunteer.user.imageUrl || '/assets/logo.png'}
              alt="봉사자 이미지"
              className="w-full h-full "
            />
          </div>

          {/* 텍스트 정보 */}
          <div className="flex flex-col justify-center gap-2 w-full">
            <h2 className="text-xl font-semibold text-center md:text-left">봉사 정보</h2>

            <InfoItem label="닉네임" value={volunteer.user.nickName} />
            <InfoItem label="시작일" value={volunteer.startDate} />
            <InfoItem label="종료일" value={volunteer.endDate} />
            <InfoItem label="출발지역" value={volunteer.departureArea} />
            <InfoItem label="도착지역" value={volunteer.arrivalArea} />
            <InfoItem label="동물 유형" value={translateAnimalType(volunteer.animalType)} />
          </div>
        </div>

        {/* 상세 내용 */}
        <div>
          <p className="text-lg font-semibold text-gray-700 mb-2">봉사 상세내용</p>
          <p className="text-gray-600 whitespace-pre-wrap">{volunteer.notice}</p>
        </div>

        {/* 버튼 영역 */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            className="px-5 py-2 rounded-lg bg-primary text-white hover:bg-hover transition-colors"
            onClick={handleEditClick}
          >
            수정하기
          </button>
          <button
            className="px-5 py-2 rounded-lg bg-primary text-white hover:bg-hover transition-colors"
            onClick={handleChatStart}
          >
            채팅하기
          </button>
        </div>
      </section>

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
        />
      )}

      {/* 채팅 모달 */}
      {modalType === 'chat' && (
        <VolunteerChatModal volunteerWorkId={volunteer.id} handleCloseModal={handleCloseModal} />
      )}
    </div>
  );
}

export default VolunteerDetail;
