import React from 'react';
import IntroDummy from '../../Assets/Dummy/IntroDummy';
import './scss/IntroContent.scss';

const IntroContent = () => {
  return (
    <div className="IntroContent__Container">
      <div className="Introduction__Title">플래닛의 농업혁명</div>
      <div className="Introduction__SubTitle">데이터와 IT기술로 새로운 농업을 만들어가겠습니다.</div>

      <div className="IntroContent__Image-Container">
        {IntroDummy.map(option => (
          <img src={option.src} alt="" className="IntroContent__Image" />
        ))}
      </div>

      <div className="Introduction__Content">플래닛은 지속가능한 농업을 위해 노력합니다.</div>
    </div>
  );
};

export default IntroContent;
