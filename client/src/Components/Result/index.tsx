import React from 'react';
import Navigation from 'Components/Common/Navigation';
import 'Components/Result/scss/Result.scss';
import SwiperCore, { Mousewheel, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import Test from './test';
import Last from './Last';

SwiperCore.use([Mousewheel, Pagination]);

const bullet = ['- 질병명', '- 피해정도', '- 예방 및 치료법', '- 가까운 치료소'];

export default function Result(): JSX.Element {
  return (
    <div className="Result__Container">
      <Navigation />
      <Swiper
        style={{ height: '100vh' }}
        direction={'vertical'}
        slidesPerView={1}
        spaceBetween={30}
        speed={1000}
        mousewheel={true}
        onReachEnd={swiper => {
          swiper.mousewheel.disable();
        }}
        onSlideChangeTransitionStart={swiper => {
          swiper.mousewheel.enable();
        }}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return '<div class="' + className + '"><span>' + bullet[index] + '</span></div>';
          },
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <Test />
        </SwiperSlide>
        <SwiperSlide>
          <Test />
        </SwiperSlide>
        <SwiperSlide>
          <Test />
        </SwiperSlide>
        <SwiperSlide>
          <Last />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
