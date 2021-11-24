import Logo from 'Assets/logo.png';
import { Link } from 'react-router-dom';
import 'Components/Common/scss/Footer.scss';

export default function Footer(): JSX.Element {
  return (
    <footer className="Footer__Container">
      <div className="Footer__Contents">
        <img className="Footer__Logo" src={Logo} alt="로고" />
        <div className="Footer__Text">
          <Link to="/member">팀 소개</Link>
          <Link to="/contact">문의</Link>
          <a href="https://www.facebook.com">페이스북</a>
          <a href="https://section.blog.naver.com/BlogHome.naver?directoryNo=0&currentPage=1&groupId=0">블로그</a>
        </div>
      </div>
      <span className="Footer__Copyright">© 2021 PLANtIT. all rights reserved.</span>
    </footer>
  );
}
