import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AnalysisApi } from 'API/AnalysisApi';
import { Link } from 'react-router-dom';
import Navigation from 'Components/Common/Navigation';
import Upload from 'Components/Analysis/Upload';
import Loading from 'Components/Common/Loading';
import Error from 'Components/Common/Error';
import 'Components/Analysis/scss/index.scss';

export default function Analysis(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [count, setCount] = useState([] as any);

  const UploadText = '잠시만 기다려 주세요';
  const ErrorText = 'COUNT API 에러가 발생했습니다';

  // 서버에서 검사수  get으로 받아오는 코드
  const GetCountAPI = async () => {
    // 요청이 시작 할 때 초기화
    setError(null);
    setCount(null);
    setLoading(true);
    const CountResponse = await AnalysisApi.Get_Count('analysis/count')
      .then(response => {
        setCount(response.data as any);
      })
      .catch(e => {
        setError(e);
      });
    setLoading(false);
    return CountResponse;
  };

  useEffect(() => {
    GetCountAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading text={UploadText} />;
  if (error)
    return (
      <>
        <Error text={ErrorText} />
        <Link to="/" className="Button__Home">
          홈으로
        </Link>
      </>
    );

  return (
    <>
      {count && (
        <>
          <Helmet>
            <title>검사하기</title>
          </Helmet>
          <div className="Analysis__Container">
            <Navigation />
            <Upload data={count.data} />
          </div>
        </>
      )}
    </>
  );
}
