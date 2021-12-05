import React from 'react';
import 'Components/Result/scss/Exception.scss';
import { Link } from 'react-router-dom';

const Exception = () => {
  return (
    <div className="Exception__Container">
      <div className="Exception__Text">인식 오류가 발생하였습니다.</div>
      <Link to="/analysis" className="Button__Go-analysis">
        다시 검사하기
      </Link>
    </div>
  );
};

export default Exception;
