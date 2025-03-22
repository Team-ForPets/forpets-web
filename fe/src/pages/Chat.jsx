import React, { useState } from 'react';

function Chat() {
  const [activeBtn, setActiveBtn] = useState('요청'); // 초기값을 '요청'으로 설정

  // 버튼 클릭 핸들러
  const handleButtonClick = (buttonName) => {
    setActiveBtn(buttonName);
  };

  return (
    <main className="flex justify-between h-[90%]">
      <section className="w-[30%] h-full bg-[#F5F5F5] border rounded-md">
        <div className="flex rounded-md SW p-1">
          <button
            className={`w-[50%] bg-amber-500 px-[1px] py-[5px] rounded-tl-[5px] transition-all duration-300  ${
              activeBtn === '요청'
                ? 'scale-90 origin-top-left  z-10' // 왼쪽 위 기준으로 확대
                : 'scale-100'
            }`}
            onClick={() => handleButtonClick('요청')}
          >
            요청
          </button>

          <button
            className={`w-[50%] bg-amber-300 px-[1px] py-[5px] rounded-tr-[5px] transition-all duration-300 ${
              activeBtn === '봉사'
                ? 'scale-90 origin-top-right z-10' // 오른쪽 위 기준으로 확대
                : 'scale-100'
            }`}
            onClick={() => handleButtonClick('봉사')}
          >
            봉사
          </button>
        </div>
        <div className="flex items-center flex-col p-1">컴포넌트 넣을 자리</div>
      </section>
      <section className="w-[69%] rounded-md border bg-[#F5F5F5] relative">
        <div className="flex justify-between items-center rounded-t-md bg-white h-[10%]">
          <div className="w-[80%] flex items-center gap-3 justify-start">
            {/* 이미지 */}
            <div className="w-[100px] box-border">
              <img
                src="assets/forpets-logopng.png"
                alt="이미지"
                className="w-[100px] h-[50px] p-2 box-border"
              />
            </div>
            <div>
              <h3 className="font-black">봉사자 이름</h3>
              <p className="text-xs">서울 도봉구 -&gt; 서초구</p>
            </div>
            <button className="text-xs bg-[#FFC28D] rounded-md py-0.5 px-2 mt-auto mb-0.5">
              아이정보
            </button>
          </div>

          <div className="w-[20%] text-center">
            <button>약속잡기</button>
          </div>
        </div>

        <div className="w-[100%] h-[10%] bg-amber-400 flex justify-between items-center absolute bottom-0">
          <input type="text" value="text" />
          <button>전달</button>
        </div>
      </section>
    </main>
  );
}

export default Chat;
