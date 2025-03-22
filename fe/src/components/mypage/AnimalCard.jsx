import React, { useState } from 'react';

function AnimalCard() {
  const [image, setImage] = useState('');
  const [hovered, setHovered] = useState(false);
  const [isToggled, setIsToggled] = useState(false);

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
              <img src={image} alt="프로필 이미지" className="w-[100%] h-[100%] rounded-md" />
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
        <div className="w-[60%] flex flex-col gap-y-3">
          <div className="flex gap-5">
            <label className="text-gray-400">날짜</label>
            <div>2025년 03월 16일</div>
          </div>
          <div className="flex gap-5">
            <label className="text-gray-400">출발지</label>
            <div>서울시 도봉구</div>
          </div>
          <div className="flex gap-5">
            <label className="text-gray-400">도착지</label>
            <div>천안시 어쩌구</div>
          </div>

          <div className="flex gap-5">
            <div className="flex flex-col gap-y-3">
              <div className="flex gap-5">
                <label className="text-gray-400">이름</label>
                <div>노려보는 고양이</div>
              </div>
              <div className="flex gap-5">
                <label className="text-gray-400">품종</label>
                <div>도메스틱 숏헤어</div>
              </div>
              <div className="flex gap-5">
                <label className="text-gray-400">나이</label>
                <div>16개월</div>
              </div>
            </div>
            <div className="flex flex-col gap-y-3">
              <div className="flex gap-5">
                <label className="text-gray-400">동물유형</label>
                <div>고양이</div>
              </div>
              <div className="flex gap-5">
                <label className="text-gray-400">체중</label>
                <div>2kg</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-10 flex h-[50%]">
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-col gap-y-1">
            <label className="text-gray-400">특징 및 주의사항</label>
            <div>매섭게 노려봄</div>
          </div>
          <div className="flex flex-col gap-y-1">
            <label className="text-gray-400">봉사자에게 전하고 싶은 말</label>
            <div>노려보지 말 것</div>
          </div>
          <div className="flex mt-5 gap-10">
            <label className="text-gray-400">이동봉사 요청글에 보이기</label>

            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer" />
              <div class="relative w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
              <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                공개 / 비공개
              </span>
            </label>
          </div>
        </div>
        <button className="self-end ml-auto w-[25%] h-[25%] px-2 py-2 bg-amber-300 cursor-pointer text-black rounded hover:bg-amber-500 transition-all">
          정보 수정
        </button>
      </div>
    </>
  );
}

export default AnimalCard;
