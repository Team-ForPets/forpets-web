import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mypageApi from '../../api/mypageApi';

function ProfileCard() {
  const [image, setImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [profile, setProfile] = useState({});

  const navigate = useNavigate();

  // 회원정보 get
  const fetchProfile = async () => {
    try {
      const response = await mypageApi.getProfile();
      const { imageUrl, username, nickname } = response.data;
      setProfile({ imageUrl, username, nickname });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

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

  // 사용자가 입력한 비밀번호 확인
  const handlePwVerify = (e) => {
    console.log(e.target.value);
  };

  // 회원정보 수정 버튼 클릭 시 모달창 팝업
  const handleUserInfoEdit = () => {
    setShowModal(true);
  };

  // 모달창에서 확인 버튼 클릭 시 회원정보 수정 카드로 이동
  const handleConfirm = () => {
    navigate('/my/profile/edit');

    // Todo: 사용자가 입력한 비밀번호를 확인하는 로직 구현 필요
    setShowModal(false);
  };

  // 모달창에서 취소 버튼 클릭 시 현재 카드 그대로 표시
  const handleCancel = () => {
    setShowModal(false);
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
          {image ? (
            <>
              <img
                src={profile.image}
                alt="프로필 이미지"
                className="w-[100%] h-[100%] rounded-md"
              />
              {hovered && (
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => document.getElementById('fileInput').click()}
                    className="bg-amber-300 hover:bg-amber-500 text-black px-2 py-1 rounded"
                  >
                    수정
                  </button>
                  <button
                    onClick={handleImageDelete}
                    className="bg-red-300 hover:bg-red-500 text-black px-2 py-1 rounded"
                  >
                    삭제
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center w-[100%] h-[100%]">
              <button
                onClick={() => document.getElementById('fileInput').click()}
                className="bg-amber-300 hover:bg-amber-500 text-black px-4 py-2 rounded cursor-pointer"
              >
                추가
              </button>
            </div>
          )}
        </div>
        <div className="w-[60%] flex flex-col gap-y-3 mt-10">
          <div className="flex gap-10">
            <label className="text-gray-400 text-lg">이메일</label>
            <div className="text-lg">{profile.username}</div>
          </div>
          <div className="flex gap-10">
            <label className="text-gray-400 text-lg">닉네임</label>
            <div className="text-lg">{profile.nickname}</div>
          </div>
        </div>
      </div>
      <div className="p-10 flex mt-30">
        <button
          className="ml-auto w-[25%] px-2 py-2 bg-amber-300 cursor-pointer text-black rounded hover:bg-amber-500 transition-all"
          onClick={handleUserInfoEdit}
        >
          회원정보 수정
        </button>
      </div>

      {/* 회원정보 수정 모달 */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full z-10">
            <div className="text-lg font-medium mb-4 text-center">
              현재 비밀번호를 입력해주세요.
            </div>
            <div className="flex justify-center space-x-4">
              <input
                type="password"
                className="bg-gray-200 text-lg pl-5 pr-5"
                onChange={handlePwVerify}
              />
              <button
                onClick={handleConfirm}
                className="bg-amber-300 hover:bg-amber-500 text-black px-4 py-2 rounded"
              >
                확인
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-100 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileCard;
