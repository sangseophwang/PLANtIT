import { Link } from 'react-router-dom';
import 'Components/Common/scss/Navigation.scss';
import NavItem from './NavItem';
import Logo from 'Assets/logo.png';
import {
  faHome,
  faLeaf,
  faBook,
  faComment,
  faUser,
  faVial,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faHome, faLeaf, faBook, faComment, faUser, faVial);

export default function Navigation(): JSX.Element {
  const category = [
    { name: '홈', address: '/', icon: faHome },
    { name: '소개', address: '/introduction', icon: faLeaf },
    { name: '질병도감', address: '/dictionary', icon: faBook },
    { name: '검사하기', address: '/analysis', icon: faVial },
    { name: '커뮤니티', address: '/community', icon: faComment },
  ];
  return (
    <nav className="Navigation__Container">
      <div className="Navigation__Category-Web">
        <Link to="/">
          <img className="Navigation__Logo" src={Logo} alt="로고 이미지" />
        </Link>
        <div className="Navigation__Category-Without-Login">
          {category.map(data => (
            <NavItem data={data} key={data.address} />
          ))}
        </div>
        <Link
          className="Navigation__Item-Web"
          to={
            localStorage.getItem('access_token') === null ? '/login' : '/mypage'
          }
        >
          {localStorage.getItem('access_token') === null
            ? '로그인'
            : '마이페이지'}
        </Link>
      </div>
      <div className="Navigation__Category-Mobile">
        {category.map(item => (
          <Link
            className="Navigation__Item-Mobile"
            to={item.address}
            key={item.address}
          >
            <FontAwesomeIcon icon={item.icon} />
            <span>{item.name}</span>
          </Link>
        ))}
        <Link
          className="Navigation__Item-Mobile"
          to={
            localStorage.getItem('access_token') === null ? '/login' : '/mypage'
          }
        >
          <FontAwesomeIcon icon={faUser} />
          <span>
            {localStorage.getItem('access_token') === null
              ? '로그인'
              : '마이페이지'}
          </span>
        </Link>
      </div>
    </nav>
  );
}
