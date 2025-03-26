import React, { useEffect, useRef, useState } from 'react';
import DaumPost from './DaumPost';

const KakaoMap = ({ animals }) => {
  const mapContainer = useRef(null); // 지도 DOM 참조
  const mapRef = useRef(null); // 지도 객체
  const markerRef = useRef(null); // 마커 객체
  const infowindowRef = useRef(null); // 인포윈도우 객체
  const [centerAddr, setCenterAddr] = useState(''); // 지도 중심 주소 상태

  useEffect(() => {
    // 카카오맵 스크립트 로드
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAOMAP_KEY}&libraries=services&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 서울 중심 좌표
          level: 3,
        };

        mapRef.current = new window.kakao.maps.Map(mapContainer.current, mapOption);
        const geocoder = new window.kakao.maps.services.Geocoder();
        infowindowRef.current = new window.kakao.maps.InfoWindow({ zIndex: 1 });
        markerRef.current = new window.kakao.maps.Marker();

        // 클릭 이벤트 등록
        window.kakao.maps.event.addListener(mapRef.current, 'click', function (mouseEvent) {
          searchDetailAddrFromCoords(mouseEvent.latLng, geocoder);
        });

        // 지도 이동 후 주소 표시
        window.kakao.maps.event.addListener(mapRef.current, 'idle', function () {
          searchAddrFromCoords(mapRef.current.getCenter(), geocoder);
        });

        // 초기에 중심 좌표 주소 가져오기
        searchAddrFromCoords(mapRef.current.getCenter(), geocoder);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const searchAddrFromCoords = (coords, geocoder) => {
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        for (let i = 0; i < result.length; i++) {
          if (result[i].region_type === 'H') {
            setCenterAddr(result[i].address_name);
            break;
          }
        }
      } else {
        setCenterAddr('주소를 찾을 수 없습니다.');
      }
    });
  };

  const searchDetailAddrFromCoords = (coords, geocoder) => {
    geocoder.coord2Address(coords.getLng(), coords.getLat(), function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        const detailAddr = result[0].road_address
          ? `<div>도로명주소: ${result[0].road_address.address_name}</div>`
          : '';
        const content = `
          <div class="bAddr">
            <span class="title">법정동 주소정보</span>
            ${detailAddr}
            <div>지번 주소: ${result[0].address.address_name}</div>
          </div>
        `;

        // 마커 위치 설정
        if (markerRef.current) {
          markerRef.current.setPosition(coords);
          markerRef.current.setMap(mapRef.current);
        }

        // 인포윈도우에 주소 내용 표시
        if (infowindowRef.current) {
          infowindowRef.current.setContent(content);
          infowindowRef.current.open(mapRef.current, markerRef.current);
        }
      } else {
        setCenterAddr('주소를 찾을 수 없습니다.');
      }
    });
  };

  return (
    <>
      <div ref={mapContainer} className="w-full h-[100%] rounded-xl shadow-md"></div>
      <div className="mt-2 text-sm text-gray-700">
        {centerAddr ? `현재 지도 중심 주소: ${centerAddr}` : '주소를 찾을 수 없습니다.'}
      </div>
      <DaumPost></DaumPost>
    </>
  );
};

export default KakaoMap;
