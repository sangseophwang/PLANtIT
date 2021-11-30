import React from 'react';
import 'Components/Result/scss/Rsecond.scss';
import level0 from 'Assets/Level/level0.png';
import level1 from 'Assets/Level/level1.png';
import level2 from 'Assets/Level/level2.png';
import level3 from 'Assets/Level/level3.png';

export default function Rsecond(props: any): JSX.Element {
  // 피해 정도 사진 렌더링 함수
  const rendering = () => {
    if (props.data.data.level === 0) {
      return <img className="Certificate__Image" src={level0} alt="" />;
    } else if (props.data.data.level === 1) {
      return <img className="Certificate__Image" src={level1} alt="" />;
    } else if (props.data.data.level === 2) {
      return <img className="Certificate__Image" src={level2} alt="" />;
    } else {
      return <img className="Certificate__Image" src={level3} alt="" />;
    }
  };

  return (
    <section className="Rsecond__Container">
      <div className="Rsecond__Title">현재 피해 정도는,</div>
      {rendering()}
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
