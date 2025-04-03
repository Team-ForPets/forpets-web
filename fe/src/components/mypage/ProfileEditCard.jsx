import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import Modal from 'react-modal';
import mypageApi from '../../api/mypageApi';

Modal.setAppElement('#root');

function ProfileEditCard() {
  const location = useLocation();
  const navigate = useNavigate();

  const userInfo = { ...location.state };

  // user 데이터 상태 관리
  const [userData, setUserData] = useState({
    nickname: userInfo.nickname || '',
    password: '',
    newPassword: '',
  });

  const [validation, setValidation] = useState({
    nickname: false,
    password: false,
    confirmPassword: false,
  });

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(userInfo.imageUrl || '');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isNicknameEdited, setIsNicknameEdited] = useState(false); // 닉네임 수정 여부
  const [isClickNicknameDuplicate, setIsClickNicknameDuplicate] = useState(false); // 닉네임 중복 확인 버튼 클릭 여부

  console.log('userInfo: ', userInfo);

  // 입력값 변경 핸들러
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 닉네임을 변경한 경우만 true로 설정
    if (name === 'nickname' && !isNicknameEdited) {
      setIsNicknameEdited(true);
    }

    handleValidation(name, value);
  };

  // 닉네임 중복 확인
  const handleNicknameVerification = async () => {
    setIsClickNicknameDuplicate(true);

    if (!userData.nickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    try {
      const response = await mypageApi.getNicknameVerification(userData.nickname);
      if (response.data.available) {
        alert('이용 가능한 닉네임입니다.');
      } else {
        alert('이미 사용 중인 닉네임입니다.');
        setUserData((prev) => ({ ...prev, nickname: '' }));
      }
    } catch (error) {
      console.error('닉네임 확인 오류:', error);
    }
  };

  const ValidationMessage = ({ message, isValid }) => {
    return (
      <p className={twMerge('text-[12px] mt-1', isValid ? 'text-cyan-500' : 'text-red-600')}>
        {message}
      </p>
    );
  };

  const handleValidation = (name, value) => {
    const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,10}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[#?!]).{8,}$/;

    let isValid = true;
    if (name === 'nickname') {
      isValid = nicknameRegex.test(value);
    } else if (name === 'password') {
      isValid = passwordRegex.test(value);
    } else if (name === 'newPassword') {
      isValid = passwordRegex.test(value);
    }

    setValidation((prev) => ({
      ...prev,
      [name]: isValid,
    }));

    // 새로운 비밀번호 확인 검증 (현재 입력한 값과 기존 입력값을 비교)
    if (name === 'password' || name === 'newPassword') {
      setValidation((prev) => ({
        ...prev,
        confirmPassword:
          name === 'newPassword'
            ? value === userData.password // 입력한 값과 기존 비밀번호 비교
            : userData.newPassword === value, // 기존 새로운 비밀번호와 입력한 값 비교
      }));
    }
  };

  // 프로필 이미지 변경
  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const newImageUrl = URL.createObjectURL(file);
      setImage(file);
      setImageUrl(newImageUrl);
    }
  };

  // 비밀번호 유효성 검사
  const handlePasswordCheck = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[#?!]).{8,}$/;

    return passwordRegex.test(userData.password)
      ? '사용 가능한 비밀번호입니다.'
      : '8자 이상, 영문, 숫자, 특수문자(#, ?, !)가 각각 1자 이상 포함되어야 합니다.';
  };

  // 새로운 비밀번호 확인
  const handleNewPasswordCheck = () => {
    if (userData.password && userData.newPassword) {
      return userData.password === userData.newPassword
        ? '비밀번호가 일치합니다.'
        : '비밀번호가 일치하지 않습니다.';
    }
    return '';
  };

  // 모달 열고 닫기
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  // 수정된 내용 저장 (백엔드 API 호출)
  const handleConfirm = async () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[#?!]).{8,}$/;

    if (userData.nickname === '') {
      alert('닉네임을 입력해야 합니다.');
      return;
    } else if (userInfo.nickname === userData.nickname) {
      alert('중복된 닉네임이라 다시 입력해야 합니다.');
      return;
    } else if (!isClickNicknameDuplicate) {
      alert('중복 확인 버튼을 통해 확인 후 수정이 가능합니다.');
      return;
    }

    // 새로운 비밀번호 입력 시 유효성 검사
    if (userData.newPassword) {
      if (!passwordRegex.test(userData.newPassword)) {
        alert('비밀번호는 8자 이상, 영문, 숫자, 특수문자(#?!@$%^&*-)를 포함해야 합니다.');
        return;
      }

      if (userData.password !== userData.newPassword) {
        alert('입력한 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
        return;
      }
    }

    try {
      const formData = new FormData();
      const jsonBlob = new Blob([JSON.stringify(userData)], { type: 'application/json' });

      if (jsonBlob) {
        formData.append('data', jsonBlob);
      }

      if (image) {
        formData.append('file', image);
      }

      
      await mypageApi.updateUserInfo(formData);
      closeModal();
      navigate('/my/profile');
    } catch (error) {
      console.error('업데이트 오류:', error);
      alert('수정에 실패했습니다.');
    }
  };

  return (
    <>
      {/* 프로필 이미지 */}
      <div className="flex gap-15 p-10 h-[50%]">
        <div
          className="w-[40%] bg-gray-300 rounded-md flex items-center justify-center relative"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img src={imageUrl} alt="프로필 이미지" className="w-[100%] h-[100%] rounded-md" />
          <input
            type="file"
            className="hidden"
            id="imageInput"
            accept="image/*"
            onChange={handleImageChange}
          />
          {hovered && (
            <button
              onClick={() => document.getElementById('imageInput').click()}
              className="absolute top-2 right-2 bg-secondary text-white px-2 py-1 rounded"
            >
              수정
            </button>
          )}
        </div>

        {/* 닉네임 변경 */}
        <div className="w-[60%] flex flex-col gap-3 mt-10">
          <div className="flex gap-5">
            <label className="text-gray-400 text-lg">이메일</label>
            <div className="rounded-md">{userInfo.username}</div>
          </div>
          <div className="flex gap-5">
            <label className="text-gray-400 text-lg">닉네임</label>
            <input
              type="text"
              name="nickname"
              className="bg-white rounded-md w-[40%]"
              value={userData.nickname}
              onChange={handleChangeInput}
            />
            <button
              className="px-2 py-2 bg-secondary text-white rounded-md hover:bg-primary"
              onClick={handleNicknameVerification}
            >
              중복 확인
            </button>
          </div>
          <div className="ml-17">
            {isNicknameEdited && userData.nickname && (
              <ValidationMessage
                message={
                  validation.nickname
                    ? isClickNicknameDuplicate
                      ? '사용 가능한 닉네임입니다.'
                      : '닉네임 형식이 올바릅니다. 중복 검사를 진행해주세요.'
                    : isClickNicknameDuplicate
                      ? '불가'
                      : '특수문자 제외, 2자 이상 10자 이하여야 합니다.'
                }
                isValid={validation.nickname}
              />
            )}
          </div>
        </div>
      </div>

      {/* 비밀번호 변경 */}
      <div className="p-10 flex h-[50%]">
        <div className="flex flex-col gap-y-3">
          <div className="flex gap-15">
            <label className="text-gray-400 text-lg">새로운 비밀번호</label>
            <input
              type="password"
              name="password"
              className="bg-white rounded-md w-[12vw] text-2xl"
              value={userData.password}
              onChange={handleChangeInput}
            />
          </div>
          <div className="ml-43">
            {userData.password && (
              <ValidationMessage
                message={
                  validation.password
                    ? '사용 가능한 비밀번호입니다.'
                    : '8자 이상, 영문, 숫자, 특수문자(#, ?, !)가 각각 1자 이상 포함되어야 합니다.'
                }
                isValid={validation.password}
              />
            )}
          </div>
          <div className="flex gap-6">
            <label className="text-gray-400 text-lg">새로운 비밀번호 확인</label>
            <input
              type="password"
              name="newPassword"
              className="bg-white rounded-md w-[12vw] text-2xl"
              value={userData.newPassword}
              onChange={handleChangeInput}
            />
          </div>
          <div className="ml-43">
            {userData.newPassword && (
              <ValidationMessage
                message={
                  validation.confirmPassword
                    ? '비밀번호가 일치합니다.'
                    : '비밀번호가 일치하지 않습니다.'
                }
                isValid={validation.confirmPassword}
              />
            )}
          </div>
        </div>

        <button
          className="self-end ml-auto w-[18%] h-[22%] px-3 py-2 bg-secondary text-white rounded hover:bg-primary transition-all"
          onClick={openModal}
        >
          수정 완료
        </button>
      </div>

      {/* 수정 확인 모달 */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        bg-gray-100 text-black p-6 rounded-xl shadow-gray-300 shadow-lg z-10 w-[25vw] h-[30vh]"
      >
        <section className="flex flex-col justify-center items-center h-full">
          <p className="text-[22px] font-semibold mb-8">입력한 내용으로 수정하시겠습니까?</p>
        </section>
        <section className="absolute bottom-4 right-4 flex space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 text-white rounded-xl hover:bg-gray-400"
            onClick={closeModal}
          >
            취소
          </button>
          <button
            // type='button'
            onClick={handleConfirm}
            className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-hover"
          >
            확인
          </button>
        </section>
      </Modal>
    </>
  );
}

export default ProfileEditCard;
