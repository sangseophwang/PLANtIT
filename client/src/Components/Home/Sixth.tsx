import 'Components/Home/scss/Sixth.scss';
import Image from 'Assets/Home/Background.jpg';

import Footer from 'Components/Common/Footer';
export default function Sixth(): JSX.Element {
  return (
    <div className="Sixth__Container">
      <img className="Sixth__Background" src={Image} alt="" />
      <div className="Sixth__Contents">
        <h1 className="Sixth__Title">Plan your plant life!</h1>
        <h3 className="Sixth__Subtitle">
          플래닛은 당신의 유익한 텃밭인생을 응원합니다!
        </h3>
      </div>
      <Footer data={'absolute'} />
    </div>
  );
}
