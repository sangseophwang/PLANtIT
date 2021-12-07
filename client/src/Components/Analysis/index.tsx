import { useEffect, useState } from 'react';
import Navigation from 'Components/Common/Navigation';
import Example from 'Components/Analysis/Example';
import Upload from 'Components/Analysis/Upload';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { AnalysisCountApi } from 'API/CountApi';
import { toast } from 'react-toastify';
import Loading from 'Components/Common/Loading';
import Error from 'Components/Common/Error';
import { Link } from 'react-router-dom';

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
    const CountResponse = await AnalysisCountApi.Get_Count('analysis/count')
      .then(response => {
        setCount(response.data as any);
        toast.success('검사하기에 오신 것을 환영합니다!', {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch(e => {
        setError(e);
      });
    setLoading(false);
    console.log('횟수', count);
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
        <HelmetProvider>
          <Helmet>
            <title>검사하기</title>
          </Helmet>
          <div>
            <Navigation />
            <Upload data={count.data} />
            <Example />
          </div>
        </HelmetProvider>
      )}
    </>
  );
}
