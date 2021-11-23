import 'Components/Community/scss/Submit.scss';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import moment from 'moment';

export default function Submit(): JSX.Element {
  const [time, setTime] = useState(moment());
  const navigate = useNavigate();
  let timer: any = null;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <h1 className="Submit__Time">현재 시간 : {time.format('HH시 mm분 ss초')}</h1>
        <div className="Submit__Buttons">
          <button onClick={() => navigate('/community')}>취소</button>
          <button>등록하기</button>
        </div>
      </div>
    </footer>
  );
}
