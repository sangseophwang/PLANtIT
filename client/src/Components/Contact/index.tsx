import React from 'react';
import 'Components/Contact/scss/Contact.scss';
import Image from 'Assets/ContactImage.jpg';
import Navigation from 'Components/Common/Navigation';

export default function Contact(): JSX.Element {
  return (
    <>
      <Navigation />

      <div className="Contact__Container">
        <img src={Image} alt="" className="Contact__Image" />
        <div className="Banner__text">도움이 필요하신가요?</div>
      </div>
      <div className="Contact__Box">
        <div className="Contact__Text">
          메일 주소 : PLANtIT@gmail.com
          <br />
          전화 번호 : 031-1234-5678
          <br />
          주소 : 서울 중구 명동2길 22 1.2층
        </div>
      </div>
    </>
  );
}
