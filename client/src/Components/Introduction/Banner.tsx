import 'Components/Introduction/scss/Banner.scss';
import Introduction_Image from 'Assets/Serviceintro/Introduction_Image.jpg';

const Banner = () => {
  return (
    <div className="Banner__Container">
      <img
        src={Introduction_Image}
        className="Banner__Image"
        alt="배너 이미지"
      />
      <span className="Banner__Text">플래닛을 소개합니다!</span>
    </div>
  );
};

export default Banner;
