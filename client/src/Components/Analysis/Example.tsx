import React from 'react';
import 'Components/Analysis/scss/Example.scss';
import Good1 from 'Assets/Example/Good/good1.jpg';
import Good2 from 'Assets/Example/Good/good2.jpg';
import Good3 from 'Assets/Example/Good/good3.jpg';
import Bad1 from 'Assets/Example/Bad/bad1.jpg';
import Bad2 from 'Assets/Example/Bad/bad2.jpg';
import Bad3 from 'Assets/Example/Bad/bad3.jpg';

const Example = () => {
  return (
    <div className="Example__container">
      <div className="SubExample__Container">
        <div className="Example__Title">좋은 예</div>
        <div className="Example__Content">
          <img src={Good1} alt="" className="Example__Image" />
          <img src={Good2} alt="" className="Example__Image" />
          <img src={Good3} alt="" className="Example__Image" />

          <div className="Example__Text">
            좋은 예시 문구가 들어갈 공간압니다.
            <br />
            - 작물의 종류를 판별할 수 있도록 너무 확대하지 말아주세요.
            <br />
            - 인식에 방해가 되지 않도록, 작물 주변을 말끔히 정리해주세요.
            <br />
            - 작 식별될 수 있도록, A4용지나 손을 이용해 크로마키를 만들어주시면 더욱 좋습니다.
            <br />
          </div>
        </div>
      </div>
      <div className="SubExample__Container">
        <div className="Example__Title">나쁜 예</div>
        <div className="Example__Content">
          <img src={Bad1} alt="" className="Example__Image" />
          <img src={Bad2} alt="" className="Example__Image" />
          <img src={Bad3} alt="" className="Example__Image" />

          <div className="Example__Text">
            나쁜 예시 문구가 들어갈 공간압니다.
            <br />
            - 작물의 종류를 판별할 수 있도록 너무 확대하지 말아주세요.
            <br />
            - 인식에 방해가 되지 않도록, 작물 주변을 말끔히 정리해주세요.
            <br />
            - 작 식별될 수 있도록, A4용지나 손을 이용해 크로마키를 만들어주시면 더욱 좋습니다.
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Example;
