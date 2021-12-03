import IntroDummy from 'Assets/Dummy/IntroDummy';
import 'Components/Introduction/scss/IntroContent.scss';

export default function IntroContent(): JSX.Element {
  return (
    <div className="IntroContent__Container">
      <div className="IntroContent__Image-Container">
        {IntroDummy.map(option => (
          <img
            src={option.src}
            alt="소개 이미지"
            className="IntroContent__Image"
          />
        ))}
      </div>
      <p className="Introduction__Content">
        플래닛은 <span>지속가능한 가드닝라이프</span>를 위해 노력합니다 🌱
      </p>
    </div>
  );
}
