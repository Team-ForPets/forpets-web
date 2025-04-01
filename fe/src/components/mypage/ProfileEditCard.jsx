import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Modal from 'react-modal';

Modal.setAppElement('#root');

function ProfileEditCard() {
  const [image, setImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [profile, setProfile] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const userInfo = { ...location.state };
  const [username, setUsername] = useState(userInfo.username || '');
  const [nickname, setNickname] = useState(userInfo.nickname || '');

  console.log('userInfo: ', userInfo);

  // 회원정보 get
  // const fetchProfile = async () => {
  //   try {
  //     const response = await mypageApi.getProfile();
  //     const { imageUrl, username, nickname } = response.data;
  //     setProfile({ imageUrl, username, nickname });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchProfile();
  // }, []);

  // 파일이 선택되었을 때 실행될 핸들러 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader(); // FileReader를 사용하여 파일을 읽음
      reader.onloadend = () => {
        console.log('파일 업로드: ', reader.result);

        // Todo: 업로드한 파일을 AWS S3에 저장하게 하는 로직 구현 필요

        setImage(reader.result); // 파일의 데이터 URL을 state에 저장
      };
      reader.readAsDataURL(file); // 파일을 데이터 URL로 읽음
    } else {
      console.log('파일이 선택되지 않았습니다.');
    }
  };

  // 이미지 삭제 버튼 클릭 시 실행
  const handleImageDelete = () => {
    setImage(''); // 이미지 URL을 초기화
  };

  // 수정 완료 버튼 클릭 시 모달창 팝업
  const openModal = () => {
    setModalIsOpen(true);
  };

  // 사용자가 이메일 수정 시 입력값 적용
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  // 수정한 정보대로 저장할 것인지 묻는 모달창 팝업
  // const handleEditCompleted = () => {
  //   setShowModal(true);
  // };

  // 수정 완료 모달창에서 확인 버튼 클릭 시 백엔드 DB의 user 테이블에 수정한 내용 저장하도록 요청
  const handleConfirm = () => {
    // Todo: 백엔드 DB의 user 테이블에 수정한 내용 저장하도록 요청하는 로직 구현 필요
    navigate('/my/profile');
    // navigate('/my/profile', {
    //   state: { imageUrl: profile.imageUrl, username: profile.username, nickname: profile.nickname },
    // });

    setModalIsOpen(false);
  };

  // 모달창에서 취소 버튼 클릭 시 현재 카드 그대로 표시
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div className="flex gap-10 p-10 h-[50%]">
        <div
          className="w-[40%] bg-gray-300 rounded-md flex items-center justify-center relative"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* 파일 업로드 input을 항상 렌더링하고, visibility만 조정 */}
          <input type="file" onChange={handleImageChange} className="hidden" id="fileInput" />
          {/* {image ? (
            <> */}
          <img
            src={userInfo.imageUrl}
            alt="프로필 이미지"
            className="w-[100%] h-[100%] rounded-md"
          />
          {hovered && (
            <div className="absolute top-2 right-2 flex gap-2">
              <button
                onClick={() => document.getElementById('fileInput').click()}
                className="bg-secondary hover:bg-primary text-white px-2 py-1 rounded"
              >
                수정
              </button>
              <button
                onClick={handleImageDelete}
                className="bg-gray-400 hover:bg-hover text-white px-2 py-1 rounded"
              >
                삭제
              </button>
            </div>
          )}
          {/* </>
          ) : (
            <div className="flex flex-col items-center justify-center w-[100%] h-[100%]">
              <button
                onClick={() => document.getElementById('fileInput').click()}
                className="bg-secondary hover:bg-primary text-white px-4 py-2 rounded cursor-pointer"
              >
                추가
              </button>
            </div>
          )} */}
        </div>
        <div className="w-[60%] flex flex-col gap-3 mt-10">
          <div className="flex gap-5">
            <label className="text-gray-400 text-lg">이메일</label>
            {/* <input
              type="text"
              className="px-2 py-2 bg-white rounded-md"
              // placeholder={userInfo.username}
              value={userInfo.username}
            /> */}
            <input
              type="text"
              className="bg-white rounded-md w-[13vw]"
              value={username}
              onChange={handleChangeUsername}
            />
          </div>
          <div className="flex gap-5">
            <label className="text-gray-400 text-lg">닉네임</label>
            {/* <div className="text-lg">{userInfo.nickname}</div> */}
            <input
              type="text"
              className="bg-white rounded-md w-[13vw]"
              value={nickname}
              onChange={handleChangeNickname}
            />
            <button className="self-end ml-auto px-2 py-2 bg-secondary cursor-pointer text-white text-sm rounded-md hover:bg-primary">
              중복 확인
            </button>
          </div>
        </div>
      </div>
      <div className="p-10 flex h-[50%]">
        <div className="flex flex-col gap-y-3 mt-10">
          <div className="flex gap-15">
            <label className="text-gray-400 text-lg">새로운 비밀번호</label>
            {/* <input
              type="text"
              className="px-2 py-2 bg-white rounded-md"
              // placeholder={userInfo.username}
              value={userInfo.username}
            /> */}
            <input
              type="text"
              className="bg-white rounded-md w-[15vw]"
              value=""
              onChange={handleChangeUsername}
            />
          </div>
          <div className="flex gap-6">
            <label className="text-gray-400 text-lg">새로운 비밀번호 확인</label>
            {/* <div className="text-lg">{userInfo.nickname}</div> */}
            <input
              type="text"
              className="bg-white rounded-md w-[15vw]"
              value=""
              onChange={handleChangeNickname}
            />
          </div>
        </div>

        <button
          className="self-end ml-auto w-[6vw] px-2 py-2 bg-secondary cursor-pointer text-white rounded hover:bg-primary transition-all"
          onClick={openModal}
        >
          수정 완료
        </button>
      </div>

      {/* 수정 완료 여부에 대한 모달 */}
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
