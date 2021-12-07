import 'Components/Home/scss/Fifth.scss';
import Image from 'Assets/Home/Background.jpg';

import Footer from 'Components/Common/Footer';
export default function Fifth(): JSX.Element {
  return (
    <div className="Fifth__Container">
      <img className="Fifth__Background" src={Image} alt="" />
      <div className="Fifth__Contents">
        <h1 className="Fifth__Title">Plan your plant life!</h1>
        <h3 className="Fifth__Subtitle">
          플래닛은 당신의 유익한 가드닝 라이프를 응원합니다!
        </h3>
      </div>
      <Footer data={'absolute'} />
    </div>
  );
}
