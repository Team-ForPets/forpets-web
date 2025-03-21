import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode'; // Daum 주소 검색 관련 hook
//주소 api

const DaumPost = ({ setAddress }) => {
  const postcodeScriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = '';
    let localAddress = data.sido + ' ' + data.sigungu;

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress = fullAddress.replace(localAddress, '');
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setAddress(fullAddress); // setAddress를 호출하여 부모 컴포넌트의 상태를 업데이트
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div type="button" onClick={handleClick} className="flex items-center">
      <button className="bg-amber-200 inline rounded-md p-2 cursor-pointer">주소검색</button>
      <p>추후 나의아이, 봉사자에 넣으면 될듯합니다.</p>
    </div>
  );
};

export default DaumPost;
