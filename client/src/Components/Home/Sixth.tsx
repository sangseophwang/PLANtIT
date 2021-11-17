import './scss/Sixth.scss';
import Footer from '../Common/Footer';
import Logo from '../../Assets/logo.png';
export default function Sixth(): JSX.Element {
  return (
    <div className="Sixth__Container">
      <div className="Sixth__Contents">
        <img className="Sixth__Logo" src={Logo} alt="로고" />
        <h1 className="Sixth__Title">Plan your plant life!</h1>
        <h3 className="Sixth__Subtitle">당신의 유익한 텃밭인생을 위해</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
      </div>
      <Footer />
    </div>
  );
}
