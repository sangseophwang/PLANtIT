import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navigation from 'Components/Common/Navigation';
import ResultFirst from 'Components/Result/ResultFirst';
import ResultThird from 'Components/Result/ResultThird';
import ResultLast from 'Components/Result/ResultLast';
import Exception from 'Components/Result/Exception';
import Loading from 'Components/Common/Loading';
import ProgressBar from 'Components/Common/ProgressBar';
import 'Components/Result/scss/Result.scss';
import MapModal from './MapModal';

library.add(faMapMarkedAlt);

export default function Result(): JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);
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
            <div className="Result__Wrapper">
              <ResultFirst data={state} />
              <ResultThird data={state} />
              {/* <ResultLast /> */}
              {!modalOpen && (
                <div className="Map__Button-Container">
                  <div
                    className="Map__Button-Wrapper"
                    onClick={() => {
                      setModalOpen(true);
                      document.body.style.overflow = 'hidden';
                    }}
                  >
                    <div className="Map__Button-text">치료소</div>
                    <FontAwesomeIcon
                      icon={faMapMarkedAlt}
                      className="Map__Button"
                    />
                  </div>
                </div>
              )}
              {modalOpen && <MapModal setOpenModal={setModalOpen} />}
            </div>
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
