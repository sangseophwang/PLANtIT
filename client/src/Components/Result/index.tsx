import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from 'Components/Common/Navigation';
import Rfirst from 'Components/Result/ResultFirst';
import Rsecond from 'Components/Result/ResultSecond';
import Rthird from 'Components/Result/Rthird';
import Rlast from './Rlast';
import Exception from './Exception';
import Loading from 'Components/Common/Loading';
import ProgressBar from 'Components/Common/ProgressBar';
import 'Components/Result/scss/Result.scss';

export default function Result(): JSX.Element {
  const { state } = useLocation();

  const ResultText = 'AI 분석중입니다.';

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
        state.data !== 'six-man' ? (
          <>
            <Navigation />
            <ProgressBar />
            <Rfirst data={state} />
            <Rsecond data={state} />
            <Rthird data={state} />
            <Rlast />
          </>
        ) : (
          <Exception />
        )
      ) : (
        <Loading text={ResultText} />
      )}
    </div>
  );
}
