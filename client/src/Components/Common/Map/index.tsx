// eslint-disable-next-line @typescript-eslint/no-unused-vars
/* global kakao */
import React, { useEffect } from 'react';
import 'Components/Common/scss/Map.scss';

declare global {
  interface Window {
    kakao: any;
  }
}

// 전체지도 생성
export default function CenterMap(props: any): JSX.Element {
  useEffect(() => {
    mapscript();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const imageSrc = 'https://ifh.cc/g/xP2IRR.png'; // 마커이미지의 주소.

  const imageSize = new window.kakao.maps.Size(35, 40); // 마커이미지의 크기
  const imageOption = { offset: new window.kakao.maps.Point(15, 0) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

  // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
  const markerImage = new window.kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOption,
  );

  const mapscript = () => {
    const container = document.getElementById('map');

    // GeoLocation을 이용해서 접속 위치를 얻어옴(사용자의 위치).
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const options = {
          center: new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude,
          ),
          level: 8,
        };

        const map = new window.kakao.maps.Map(container, options);

        props.data.forEach((el: { lat: any; lng: any; name: any }) => {
          // 마커를 생성.
          let marker = new window.kakao.maps.Marker({
            // 마커가 표시 될 지도
            map: map,
            // 마커가 표시 될 위치
            position: new window.kakao.maps.LatLng(el.lat, el.lng),
            // 마커에 hover시 나타날 title
            title: el.name,
            // 이미지 변경
            image: markerImage,
            clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정.
          });

          // 인포윈도우를 생성.
          let infowindow = new window.kakao.maps.InfoWindow({
            removable: true,
            zIndex: 1,
          });

          // 마커에 클릭이벤트를 등록
          window.kakao.maps.event.addListener(marker, 'click', function () {
            // 마커 위에 인포윈도우를 표시
            infowindow.setContent(
              '<div style="padding:0.2rem;font-size:1rem;text-align:center;margin:1rem auto; display:block; width:150px;">' +
                el.name +
                `</div><a target='_blank' href="https://map.kakao.com/link/to/${el.name},${el.lat},${el.lng}" style="text-decoration:none;text-align:center;display:block;margin:1rem auto;color: #5085BB;">길 찾기</a>`,
            );
            infowindow.open(map, marker);
          });
        });
      });

      // GeoLocation을 이용해서 접속 위치를 얻어올 수 없는 경우(선릉역 위치).
    } else {
      const options = {
        center: new window.kakao.maps.LatLng(37.5043, 127.04925),
        level: 12,
      };
      const map = new window.kakao.maps.Map(container, options);

      props.data.forEach((el: { lat: any; lng: any; name: any }) => {
        new window.kakao.maps.Marker({
          map: map,
          position: new window.kakao.maps.LatLng(el.lat, el.lng),
          title: el.name,
          image: markerImage,
        });
      });
    }
  };

  return (
    <>
      <div id="map" />
    </>
  );
}
