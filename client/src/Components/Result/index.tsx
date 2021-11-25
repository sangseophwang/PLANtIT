import React, { useEffect, useState } from 'react';
import Navigation from 'Components/Common/Navigation';
import 'Components/Result/scss/Result.scss';
import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import Last from './Last';
import Rfirst from 'Components/Result/Rfirst';
import Rsecond from 'Components/Result/Rsecond';
import Rthird from 'Components/Result/Rthird';
import axios from 'axios';
import { Link } from 'react-router-dom';

SwiperCore.use([Pagination]);

const bullet = [
  '- 질병명',
  '- 피해정도',
  '- 예방 및 치료법',
  '- 가까운 치료소',
];

export default function Result(): JSX.Element {
  // API로 부터 질병 진단 정보를 받아오는 Axios GET 코드.

  // const [result, setResult] = useState([] as any);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // // API로 부터 정보를 받아옴.
  // const GetResultAPI = async () => {
  //   // 요청이 시작 할 때 초기화
  //   setError(null);
  //   setResult(null);
  //   setLoading(true);
  //   const ResultResponse = await axios
  //     .get(`http://localhost:8000/api/아직 미정`)
  //     .then(response => {
  //       setResult(response.data);
  //     })
  //     .catch(e => {
  //       setError(e);
  //     });
  //   setLoading(false);
  //   return ResultResponse;
  // };

  // useEffect(() => {
  //   GetResultAPI();
  // }, []);

  // if (loading)
  //   return <div className="Notice__Container">잠시만 기다려 주세요</div>;
  // if (error)
  //   return (
  //     <>
  //       <div className="Notice__Container">API 에러가 발생했습니다</div>
  //       <Link to="/Analysis" className="Button__Home">
  //         뒤로가기
  //       </Link>
  //     </>
  //   );
  // if (!result) return null as any;

  return (
    <div className="Result__Container">
      <Navigation />
      <Swiper
        style={{ height: '100vh' }}
        direction={'vertical'}
        slidesPerView={1}
        spaceBetween={30}
        speed={1000}
        // onReachEnd={swiper => {
        //   swiper.mousewheel.disable();
        // }}
        // onSlideChangeTransitionStart={swiper => {
        //   swiper.mousewheel.enable();
        // }}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return (
              '<div class="' +
              className +
              '"><span>' +
              bullet[index] +
              '</span></div>'
            );
          },
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <Rfirst />
        </SwiperSlide>
        <SwiperSlide>
          <Rsecond />
        </SwiperSlide>
        <SwiperSlide>
          <Rthird />
        </SwiperSlide>
        <SwiperSlide>
          <Last />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
