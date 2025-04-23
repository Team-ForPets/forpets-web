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
    <div>
      <section className="flex justify-between flex-col border-2 rounded-xl border-gray p-7 h-[70vh]">
        <section className="flex gap-10">
          <section className="flex items-center justify-center border border-gray rounded-xl w-[25vw] h-[35vh]">
            <img
              src={volunteer.user.imageUrl || '/assets/logo.png'}
              alt="봉사자 이미지"
              className="rounded-xl w-full h-full"
            />
          </section>

          <section className="flex flex-col w-[52%] h-[35vh] gap-2.5">
            <p className="text-2xl text-center">봉사 정보</p>
            <p className="font-medium">
              닉네임 : <span className="font-normal">{volunteer.user.nickName}</span>
            </p>
            <p className="font-medium">
              시작일 : <span className="font-normal">{volunteer.startDate}</span>
            </p>
            <p className="font-medium">
              종료일 : <span className="font-normal">{volunteer.endDate}</span>
            </p>
            <p className="font-medium">
              출발지역 : <span className="font-normal">{volunteer.departureArea}</span>
            </p>
            <p className="font-medium">
              도착지역 : <span className="font-normal">{volunteer.arrivalArea}</span>
            </p>
            <p className="font-medium">
              동물 유형 :{' '}
              <span className="font-normal">{translateAnimalType(volunteer.animalType)}</span>
            </p>
          </section>
        </section>

        <p className="font-medium">봉사 상세내용</p>
        <p className=""> {volunteer.notice}</p>

        <section className="flex justify-end gap-5 mt-5">
          <button
            className="border-1 rounded-xl w-30 p-3 border-gray bg-primary text-white hover:bg-hover cursor-pointer"
            onClick={handleEditClick}
          >
            수정하기
          </button>
          <button
            className="border-1 rounded-xl w-30 p-3 border-gray bg-primary text-white hover:bg-hover cursor-pointer"
            onClick={handleChatStart}
          >
            채팅하기
          </button>
        </section>
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
