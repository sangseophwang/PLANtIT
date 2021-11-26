import React from 'react';
import 'Components/Result/scss/Rsecond.scss';
import level0 from 'Assets/Level/level0.png';

export default function Rsecond(): JSX.Element {
  return (
    <section className="Rsecond__Container">
      <div className="Rsecond__Title">현재 피해 정도는,</div>
      <img className="Certificate__Image" src={level0} alt="" />
      <div className="Certificate__Content">
        · 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화
        <br />
        · 삼천리 화려강산, 동해물과 백두산이 마르고 닳도록 하느님이 보우하사
        <br />
        · 우리나라만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이
        <br />
        · 보전하세,동해물과 백두산이 마르고 닳도록 하느님이 보우하사
        우리나라만세
        <br />
      </div>
    </section>
  );
}
