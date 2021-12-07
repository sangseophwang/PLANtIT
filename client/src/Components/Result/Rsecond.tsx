import React from 'react';
import 'Components/Result/scss/Rsecond.scss';
import level0 from 'Assets/Analysis_Result/Level/level0.png';
import level1 from 'Assets/Analysis_Result/Level/level1.png';
import level2 from 'Assets/Analysis_Result/Level/level2.png';
import level3 from 'Assets/Analysis_Result/Level/level3.png';

export default function Rsecond(props: any): JSX.Element {
  const RsecondData = props.data.data;

  // 피해 정도 렌더링 함수
  const rendering = () => {
    if (RsecondData.level === 0) {
      return (
        <>
          <img className="Certificate__Image" src={level0} alt="" />
          <div className="Certificate__Content">
            - 0단계 입니다.
            <br />- 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라
            만세 무궁화 삼천리 화려강산
          </div>
        </>
      );
    } else if (RsecondData.level === 1) {
      return (
        <>
          <img className="Certificate__Image" src={level1} alt="" />
          <div className="Certificate__Content">
            - 1단계 입니다.
            <br />- 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라
            만세 무궁화 삼천리 화려강산
          </div>
        </>
      );
    } else if (RsecondData.level === 2) {
      return (
        <>
          <img className="Certificate__Image" src={level2} alt="" />
          <div className="Certificate__Content">
            - 2단계 입니다.
            <br />- 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라
            만세 무궁화 삼천리 화려강산
          </div>
        </>
      );
    } else {
      return (
        <>
          <img className="Certificate__Image" src={level3} alt="" />
          <div className="Certificate__Content">
            - 3단계 입니다.
            <br />- 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라
            만세 무궁화 삼천리 화려강산
          </div>
        </>
      );
    }
  };

  return (
    <section className="Rsecond__Container">
      <div className="Rsecond__Title">현재 피해 정도는,</div>
      {rendering()}
    </section>
  );
}
