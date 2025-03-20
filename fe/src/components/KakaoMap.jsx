import React, { useEffect } from 'react';

const KakaoMap = () => {
  useEffect(() => {
    // 이미 kakao 객체가 존재하는지 확인
    if (window.kakao && window.kakao.maps) {
      createMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=REACT_APP_KAKAOMAP_KEY&autoload=false`;
    script.async = true;

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          createMap();
        });
      }
    };

    script.onerror = (error) => {
      console.error('Kakao Map API 로드 실패', error);
    };

    document.head.appendChild(script);
  }, []);

  const createMap = () => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    new window.kakao.maps.Map(container, options);
  };

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
};

export default KakaoMap;
