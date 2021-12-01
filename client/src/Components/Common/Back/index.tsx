import { Link } from 'react-router-dom';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'Components/Common/scss/Back.scss';

library.add(faChevronLeft);

export default function Back(): JSX.Element {
  return (
    <Link className="Back__Container" to="/">
      <FontAwesomeIcon icon={faChevronLeft} />
      <span> 뒤로 가기</span>
    </Link>
  );
}
