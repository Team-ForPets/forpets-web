import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import DaumPost from './DaumPost';

const KakaoMap = ({ animals }) => {
  const mapContainer = useRef(null); // 지도 DOM 참조
  const mapRef = useRef(null); // 지도 객체
  const markerRef = useRef(null); // 마커 객체
  const infowindowRef = useRef(null); // 인포윈도우 객체
  const [centerAddr, setCenterAddr] = useState(''); // 지도 중심 주소 상태
  const kakaoMapKey = import.meta.env.VITE_KAKAOMAP_KEY;
  const kakaoRestKey = import.meta.env.VITE_KAKAO_REST_KEY;

  console.log(animals);

  useEffect(() => {
    // 카카오맵 스크립트 로드
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapKey}&libraries=services&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // 맵 로드 유효성 검사
      if (!window.kakao || !window.kakao.maps) {
        console.error('🚨 카카오맵 스크립트 로드 실패');
        return;
      }

      // 카카오맵 스크립트가 로드된 후에만 실행
      window.kakao.maps.load(() => {
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 서울 중심 좌표
          level: 10,
        };

        mapRef.current = new window.kakao.maps.Map(mapContainer.current, mapOption);
        infowindowRef.current = new window.kakao.maps.InfoWindow({ zIndex: 1 });
        markerRef.current = new window.kakao.maps.Marker();

        // 지도 클릭 시 주소 검색
        window.kakao.maps.event.addListener(mapRef.current, 'click', function (mouseEvent) {
          const lat = mouseEvent.latLng.getLat();
          const lng = mouseEvent.latLng.getLng();
          searchDetailAddrFromCoords(lat, lng);
        });

        // 지도 중심 이동 시 주소 검색
        window.kakao.maps.event.addListener(mapRef.current, 'idle', function () {
          const center = mapRef.current.getCenter();
          searchAddrFromCoords(center.getLat(), center.getLng());
        });

        // 초기 로드 시 중심 주소 가져오기
        const center = mapRef.current.getCenter();
        searchAddrFromCoords(center.getLat(), center.getLng());

        // animals 배열을 map을 통해 각 동물 정보를 표시
        if (animals && animals.length > 0) {
          animals.map((animal) => {
            const { departureArea, arrivalArea, animalName } = animal;
            geocodeAddresses(departureArea, arrivalArea, animalName);
          });
        }
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [animals, kakaoMapKey]);

  // ✅ 주소를 위도/경도로 변환 (지오코딩)
  const geocodeAddresses = async (departure, arrival, animalName) => {
    try {
      const locations = [
        { address: departure, label: `${animalName} - 출발지` },
        { address: arrival, label: `${animalName} - 도착지` },
      ];

      for (const location of locations) {
        const { address, label } = location;
        if (!address) continue; // 주소가 없으면 스킵

        const response = await axios.get(`https://dapi.kakao.com/v2/local/search/address.json`, {
          params: { query: address },
          headers: { Authorization: `KakaoAK ${kakaoRestKey}` },
        });

        if (response.data.documents.length === 0) {
          console.error(`🚨 지오코딩 결과 없음: ${address}`);
          continue;
        }

        // 좌표 추출
        const { x: longitude, y: latitude } = response.data.documents[0].address;
        if (!longitude || !latitude) {
          console.error('🚨 좌표 정보 없음');
          continue;
        }

        console.log(`📌 ${label} 지오코딩 성공:`, latitude, longitude);

        // 마커 생성 및 지도에 표시
        const position = new window.kakao.maps.LatLng(latitude, longitude);
        const marker = new window.kakao.maps.Marker({
          position,
          map: mapRef.current,
        });

        // 인포윈도우 추가
        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;">📍 <b>${label}</b></div>`,
        });
        infowindow.open(mapRef.current, marker);
      }
    } catch (error) {
      console.error('주소 지오코딩 실패:', error);
    }
  };
  // ✅ Axios로 행정구역 주소 변환 (coord2RegionCode)
  const searchAddrFromCoords = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json`,
        {
          params: { x: lng, y: lat },
          headers: { Authorization: `KakaoAK ${kakaoRestKey}` },
        },
      );
      if (response.data.documents.length > 0) {
        const region = response.data.documents.find((doc) => doc.region_type === 'H');
        setCenterAddr(region ? region.address_name : '주소를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('주소 검색 실패:', error);
      setCenterAddr('주소를 찾을 수 없습니다.');
    }
  };

  // ✅ Axios로 도로명/지번 주소 변환 (coord2Address)
  const searchDetailAddrFromCoords = async (lat, lng) => {
    try {
      const response = await axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json`, {
        params: { x: lng, y: lat },
        headers: { Authorization: `KakaoAK ${kakaoRestKey}` },
      });
      if (response.data.documents.length > 0) {
        const address = response.data.documents[0];
        const detailAddr = address.road_address
          ? `도로명주소: ${address.road_address.address_name}`
          : '';
        const jibunAddr = `지번 주소: ${address.address.address_name}`;

        if (markerRef.current) {
          markerRef.current.setPosition(new window.kakao.maps.LatLng(lat, lng));
          markerRef.current.setMap(mapRef.current);
        }
        if (infowindowRef.current) {
          infowindowRef.current.setContent(`
            <div class="bAddr">
              <span class="title">법정동 주소정보</span>
              <div>${detailAddr}</div>
              <div>${jibunAddr}</div>
            </div>
          `);
          infowindowRef.current.open(mapRef.current, markerRef.current);
        }
      }
    } catch (error) {
      console.error('상세 주소 검색 실패:', error);
    }
  };

  return (
    <>
      <div ref={mapContainer} className="w-full h-[100%] rounded-xl shadow-md"></div>
      <div className="mt-2 text-sm text-gray-700">
        {centerAddr ? `현재 지도 중심 주소: ${centerAddr}` : '주소를 찾을 수 없습니다.'}
      </div>
      <DaumPost />
    </>
  );
};

export default KakaoMap;
