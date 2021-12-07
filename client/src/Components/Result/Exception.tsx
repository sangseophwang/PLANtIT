import 'Components/Result/scss/Exception.scss';
import { Link } from 'react-router-dom';

const Exception = () => {
  return (
    <div className="Exception__Container">
      <div className="Exception__Text">
        정상이거나 올바르지 않은 사진입니다.
      </div>
      <Link to="/analysis" className="Button__Go-analysis">
        다시 검사하기
      </Link>
    </div>
  );
};

export default Exception;
