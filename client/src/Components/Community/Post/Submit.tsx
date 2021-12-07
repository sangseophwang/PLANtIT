import 'Components/Community/scss/Submit.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import moment from 'moment';

interface SubmitProps {
  onSubmitHandler: () => void;
}

export default function Submit({ onSubmitHandler }: SubmitProps): JSX.Element {
  const [time, setTime] = useState(moment());
  const navigate = useNavigate();

  useEffect(() => {
    let timer: any = null;
    timer = setInterval(() => {
      setTime(moment());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <footer className="Submit__Container">
      <div className="Submit__Wrapper">
        <h1 className="Submit__Time">
          현재 시간 : {time.format('HH시 mm분 ss초')}
        </h1>
        <div className="Submit__Buttons">
          <button onClick={() => navigate('/community')}>취소</button>
          <button onClick={onSubmitHandler}>등록하기</button>
        </div>
      </div>
    </footer>
  );
}
