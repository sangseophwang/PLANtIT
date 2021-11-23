import { Link } from 'react-router-dom';
import 'Components/Common/scss/Navigation.scss';
import NavItem from './NavItem';
import Logo from 'Assets/logo.png';
import { faHome, faLeaf, faBook, faComment, faUser, faVial } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faHome, faLeaf, faBook, faComment, faUser, faVial);

export default function Navigation(): JSX.Element {
  const category = [
    { name: '홈', address: '/', icon: faHome },
    { name: '소개', address: '/Introduction', icon: faLeaf },
    { name: '질병도감', address: '/Dictionary', icon: faBook },
    { name: '검사하기', address: '/Analysis', icon: faVial },
    { name: '커뮤니티', address: '/Community', icon: faComment },
  ];
  return (
    <nav className="Navigation__Container">
      <div className="Navigation__Category-Web">
        <img className="Navigation__Logo" src={Logo} alt="로고 이미지" />
        <div className="Navigation__Category-Without-Login">
          {category.map(data => (
            <NavItem data={data} key={data.address} />
          ))}
        </div>
        <Link className="Navigation__Item-Web" to="/login">
          로그인
        </Link>
      </div>
      <div className="Navigation__Category-Mobile">
        {category.map(item => (
          <Link className="Navigation__Item-Mobile" to={item.address}>
            <FontAwesomeIcon icon={item.icon} />
            <span>{item.name}</span>
          </Link>
        ))}
        <Link className="Navigation__Item-Mobile" to="/login">
          <FontAwesomeIcon icon={faUser} />
          <span>로그인</span>
        </Link>
      </div>
    </nav>
  );
}
