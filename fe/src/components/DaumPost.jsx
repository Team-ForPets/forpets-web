import axios from 'axios';
import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode'; // Daum 주소 검색 관련 hook
//주소 api
const DaumPost = ({ setAddress }) => {
  const postcodeScriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    console.log(fullAddress, 'haha');
    setAddress(fullAddress); // setAddress를 호출하여 부모 컴포넌트의 상태를 업데이트

    // Kakao API를 사용하여 주소를 위도, 경도로 변환
  //   axios.get('https://dapi.kakao.com/v2/local/search/address.json', {
  //     headers: {
  //       Authorization: `KakaoAK ${import.meta.env.VITE_KAKAOCOORD_API_KEY}` // 환경 변수에서 API 키를 가져옵니다.
  //     },
  //     params: {
  //       query: fullAddress // fullAddress를 사용하여 변환할 주소
  //     }
  //   })
  //   .then(response => {
  //     if (response.data.documents.length > 0) {
  //       const latitude = response.data.documents[0].y; // 위도
  //       const longitude = response.data.documents[0].x; // 경도
  //       console.log(`위도: ${latitude}, 경도: ${longitude}`);
  //       // 여기서 latitude와 longitude를 부모 컴포넌트로 전달하거나 상태를 업데이트할 수 있습니다.

  //       // axios.get(local, adrress) -> response를 활용히자

  //     } else {
  //       console.error('주소에 대한 결과가 없습니다.');
  //     }
  //   })
  //   .catch(error => {
  //     console.error('주소 변환 중 오류 발생:', error);
  //   });
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div type="button" onClick={handleClick} className="flex items-center">
      <button className="bg-amber-200 inline rounded-md p-2 cursor-pointer">주소검색</button>
    </div>
  );
};

export default DaumPost;
