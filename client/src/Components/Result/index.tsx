import React, { useEffect } from 'react';
import Navigation from 'Components/Common/Navigation';
import 'Components/Result/scss/Result.scss';
import Rfirst from 'Components/Result/Rfirst';
import Rsecond from 'Components/Result/Rsecond';
import Rthird from 'Components/Result/Rthird';
import { useLocation } from 'react-router-dom';
import Rlast from './Rlast';

export default function Result(): JSX.Element {
  const { state } = useLocation();

  // useNavigate 값 받는 함수
  const ReadResponse = () => {
    if (state) {
      console.log('결과 페이지', state);
      return state;
    }
  };

  useEffect(() => {
    ReadResponse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <div className="Result__Container">
      {state ? (
        <>
          <Navigation />
          <Rfirst data={state} />
          <Rsecond data={state} />
          <Rthird data={state} />
          <Rlast />
        </>
      ) : (
        <>
          <div className="Result__Notice-Container">
            <div className="loader" />
            AI 분석중입니다.
          </div>
        </>
      )}
    </div>
  );
}
