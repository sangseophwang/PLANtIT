import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navigation from 'Components/Common/Navigation';
import ResultFirst from 'Components/Result/ResultFirst';
import ResultSecond from 'Components/Result/ResultSecond';
import ResultThird from 'Components/Result/ResultThird';
import ResultLast from 'Components/Result/ResultLast';
import Footer from 'Components/Common/Footer';
import Exception from 'Components/Result/Exception';
import Loading from 'Components/Common/Loading';
import ProgressBar from 'Components/Common/ProgressBar';
import 'Components/Result/scss/Result.scss';

export default function Result(): JSX.Element {
  const { state } = useLocation();

  const ResultText = 'AI 분석중입니다.';

  // useNavigate 값 받는 함수
  const ReadResponse = () => {
    if (state) {
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
            <Helmet>
              <title>결과 보기</title>
            </Helmet>
            <Navigation />
            <ProgressBar />
            <ResultFirst data={state} />
            <ResultSecond data={state} />
            <ResultThird data={state} />
            <ResultLast />
            <Footer data={'relative'} />
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
