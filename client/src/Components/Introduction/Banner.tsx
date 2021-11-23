import React from 'react';
import 'Components/Introduction/scss/Banner.scss';
import IntroImage from 'Assets/IntroImage.jpg';

const Banner = () => {
  return (
    <div className="Banner__Container">
      <img src={IntroImage} className="Banner__Image" alt="" />
      <div className="Banner__text">지구를 위한 우리의 계획</div>
    </div>
  );
};

export default Banner;
