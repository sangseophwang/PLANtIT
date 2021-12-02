import 'Components/Community/scss/Pagination.scss';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faChevronLeft, faChevronLeft);

interface PaginationProps {
  length: any;
  page: number;
  onChangePage: Function;
}

export default function Pagination({
  length,
  page,
  onChangePage,
}: PaginationProps): JSX.Element {
  // 페이지네이션 수 배열에 담기
  const LIMIT_PAGE = Math.ceil(length / 4);
  let pageNumber: number[] = [];
  if (page + 4 >= LIMIT_PAGE) {
    pageNumber = [];
    for (let j = LIMIT_PAGE; j >= LIMIT_PAGE - 4; j--) {
      pageNumber.push(j);
      pageNumber.sort();
    }
  } else {
    for (let i = page; i <= page + 4; i++) {
      pageNumber.push(i);
      pageNumber.sort((a, b) => a - b);
    }
  }

  // 페이지네이션, 현재 페이지 위치 출력
  const ListItem = (props: any) => {
    return (
      <li
        className={
          props.value === page
            ? 'Pagination__Number Here'
            : 'Pagination__Number'
        }
        onClick={() => {
          onChangePage(props.value);
        }}
      >
        {props.value}
      </li>
    );
  };

  // 이전 화살표 버튼
  const handlePreviousButton = () => {
    onChangePage(page - 1);
  };

  // 다음 화살표 버튼
  const handleNextButton = () => {
    onChangePage(page + 1);
  };

  return (
    <div className="Pagination__Container">
      <ul className="Pagination__Wrapper">
        <FontAwesomeIcon
          className={
            page === 1 ? 'Pagination__Arrow Disable' : 'Pagination__Arrow'
          }
          icon={faChevronLeft}
          onClick={handlePreviousButton}
        />
        {pageNumber.map(number => (
          <ListItem key={number} value={number} />
        ))}
        <FontAwesomeIcon
          className={
            page === pageNumber[pageNumber.length - 1]
              ? 'Pagination__Arrow Disable'
              : 'Pagination__Arrow'
          }
          icon={faChevronRight}
          onClick={handleNextButton}
        />
      </ul>
    </div>
  );
}
