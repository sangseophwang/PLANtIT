import Logo from 'Assets/logo.png';
import { Link } from 'react-router-dom';
import 'Components/Common/scss/Footer.scss';

export default function Footer(props: any): JSX.Element {
  return (
    <footer className="Footer__Container" style={{ position: props.data }}>
      <div className="Footer__Contents">
        <img className="Footer__Logo" src={Logo} alt="로고" />
        <div className="Footer__Text">
          <Link to="/member">팀 소개</Link>
          <Link to="/contact">문의</Link>
          <span
            onClick={() =>
              window.open(
                'https://www.facebook.com/%ED%94%8C%EB%9E%98%EB%8B%9B-103380602183948',
              )
            }
          >
            페이스북
          </span>
          <span
            onClick={() =>
              window.open('https://www.instagram.com/team_plant_it/')
            }
          >
            인스타그램
          </span>
        </div>
      </div>
      <span className="Footer__Copyright">
        © 2021 PLANtIT. all rights reserved.
      </span>
      <span className="Bottom">bottom</span>
    </footer>
  );
}
