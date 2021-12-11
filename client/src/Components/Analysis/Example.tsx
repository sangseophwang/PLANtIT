import 'Components/Analysis/scss/Example.scss';
import Good1 from 'Assets/Analysis_Result/Good/good1.jpeg';
import Good2 from 'Assets/Analysis_Result/Good/good2.jpg';
import Good3 from 'Assets/Analysis_Result/Good/good3.jpg';
import Bad1 from 'Assets/Analysis_Result/Bad/bad1.jpeg';
import Bad2 from 'Assets/Analysis_Result/Bad/bad2.jpg';
import Bad3 from 'Assets/Analysis_Result/Bad/bad3.jpg';

const Example = () => {
  return (
    <div className="Example__Container">
      <div className="Example__Wrapper">
        <div className="SubExample__Container">
          <div className="Example__Title">촬영 가이드라인 📸</div>
          <div className="Example__Text-Container">
            <div className="Example__Text">
              <span style={{ marginRight: '0.5rem' }}>🌳</span> 작물의 촬영
              부위는 '열매, 잎, 가지, 줄기, 뿌리'에 한정되어 있습니다.
            </div>
            <div className="Example__Text">
              <span style={{ marginRight: '0.5rem' }}>🌳</span> 촬영 부위가
              잘려서는 안됩니다.
            </div>
            <div className="Example__Text">
              <span style={{ marginRight: '0.5rem' }}>🌳</span> 가급적 사진에 꽉
              채우도록 찍어주세요.
            </div>
            <div className="Example__Text">
              <span style={{ marginRight: '0.5rem' }}>🌳</span> 그림자, 손 등
              외부요인에 의해 일부가 가려져선 안됩니다.
            </div>
            <div className="Example__Text">
              <span style={{ marginRight: '0.5rem' }}>🌳</span> 잎의 경우,
              되도록 접히거나 말림이 없어야 합니다.
            </div>
          </div>

          <div className="Example__Content">
            <div className="Example__Subtitle">좋은 예</div>
            <img src={Good1} alt="" className="Example__Image" />
            <img src={Good2} alt="" className="Example__Image" />
            <img src={Good3} alt="" className="Example__Image" />
          </div>
        </div>
        <div className="SubExample__Container">
          <div className="Example__Content">
            <div className="Example__Subtitle">
              나쁜 예
              <br />
            </div>
            <img src={Bad1} alt="" className="Example__Image" />
            <img src={Bad2} alt="" className="Example__Image" />
            <img src={Bad3} alt="" className="Example__Image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Example;
