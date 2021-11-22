import React from 'react';
import Navigation from '../Components/Common/Navigation';
import './scss/Contact.scss';
import Image from '../Assets/ContactImage.jpg';

export default function Contact(): JSX.Element {
  return (
    <>
      <Navigation />

      <div className="Contact__Container">
        <h1>도움이 필요하신가요?</h1>
        <img src={Image} alt="" className="Contact__Image" />
      </div>
      <div className="Contact__Box">
        <h1>
          메일 주소 : PLANtIT@gmail.com
          <br />
          전화 번호 : 031-1234-5678
          <br />
          주소 : 서울 중구 명동2길 22 1.2층
        </h1>
      </div>
    </>
  );
}
