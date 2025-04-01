import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mypageApi from '../../api/mypageApi';

import Modal from 'react-modal';

Modal.setAppElement('#root');

function ProfileCard() {
  const [profile, setProfile] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const navigate = useNavigate();

  // 회원정보 get
  const fetchProfile = async () => {
    try {
      const response = await mypageApi.getProfile();
      console.log('response : ', response);
      const { imageUrl, nickname, username } = response.data;
      setProfile({ imageUrl, nickname, username });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // 사용자가 입력한 비밀번호 확인
  const handlePwVerify = (e) => {
    console.log(e.target.value);
  };

  // 회원정보 수정 버튼 클릭 시 모달창 팝업
  const openModal = () => {
    setModalIsOpen(true);
  };

  // 모달창에서 확인 버튼 클릭 시 회원정보 수정 카드로 이동
  const handleConfirm = ({}) => {
    if (profile.imageUrl === null) {
      profile.imageUrl = '/assets/profile_thumbnail.png';
    }

    navigate('/my/profile/edit', {
      state: {
        imageUrl: profile.imageUrl,
        username: profile.username,
        nickname: profile.nickname,
      },
    });

    // Todo: 사용자가 입력한 비밀번호를 확인하는 로직 구현 필요

    setModalIsOpen(false);
  };

  // 모달창에서 취소 버튼 클릭 시 현재 카드 그대로 표시
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div className="flex gap-10 p-10 h-[50%]">
        <div className="w-[40%] h-[100%] bg-gray-300 rounded-md flex items-center justify-center relative">
          {profile.imageUrl ? (
            <img
              src={profile.imageUrl}
              alt="프로필 이미지"
              className="w-[100%] h-[100%] rounded-md"
            />
          ) : (
            <img
              src="/assets/profile_thumbnail.png"
              alt="기본 프로필 이미지"
              className="w-[100%] h-[100%] rounded-md"
            />
          )}
        </div>
        <div className="w-[60%] flex flex-col gap-y-3 mt-10">
          <div className="flex gap-10">
            <label className="text-gray-500 text-lg">이메일</label>
            <div className="text-lg">{profile.username}</div>
          </div>
          <div className="flex gap-10">
            <label className="text-gray-500 text-lg">닉네임</label>
            <div className="text-lg">{profile.nickname}</div>
          </div>
        </div>
      </div>
      <div className="p-10 flex h-[50%]">
        <button
          className="self-end ml-auto w-[20%] px-2 py-2 bg-secondary cursor-pointer text-white rounded hover:bg-primary transition-all"
          onClick={openModal}
        >
          회원정보 수정
        </button>
      </div>

      {/* 회원정보 수정 모달 */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        bg-gray-100 text-black p-6 rounded-xl shadow-gray-300 shadow-lg z-10 w-[25vw] h-[30vh]"
      >
        <section className="flex flex-col justify-center items-center h-full">
          <p className="text-[22px] font-semibold mb-8">비밀번호를 입력해주세요.</p>
          <input type="password" className="bg-white text-lg" onChange={handlePwVerify} />
        </section>
        <section className="absolute bottom-4 right-4 flex space-x-4">
          {/* <input type="password" className="bg-gray-200" onChange={handlePwVerify} /> */}
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

export default ProfileCard;
