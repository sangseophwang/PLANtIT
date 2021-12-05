import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DictionaryApi } from 'API/DictionaryApi';
import Navigation from 'Components/Common/Navigation';
import DictionaryContainer from 'Components/Dictionary/DictionaryContainer';
import ProgressBar from 'Components/Common/ProgressBar';
import DictionaryTitle from 'Components/Dictionary/DictionaryTitle';
import 'Components/Dictionary/scss/index.scss';

export default function Dictionary(): JSX.Element {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pathology, setPathology] = useState([] as any);

  // API로 부터 정보를 받아옴.
  const GetDictionaryAPI = async () => {
    // 요청이 시작 할 때 초기화
    setError(null);
    setPathology(null);
    setLoading(true);
    const DictionaryResponse = await DictionaryApi.Get_Dictionary('disease')
      .then(response => {
        setPathology(response.data);
      })
      .catch(e => {
        setError(e);
      });
    setLoading(false);
    return DictionaryResponse;
  };

  useEffect(() => {
    GetDictionaryAPI();
  }, []);

  if (loading)
    return <div className="Notice__Container">잠시만 기다려 주세요</div>;
  if (error)
    return (
      <>
        <div className="Notice__Container">API 에러가 발생했습니다</div>
        <Link to="/" className="Button__Home">
          홈으로
        </Link>
      </>
    );
  if (!pathology) return null as any;

  return (
    <>
      <Helmet>
        <title>질병도감</title>
      </Helmet>
      <Navigation />
      <ProgressBar />
      <div className="Dictionary__Container">
        <div className="Dictionary__Wrapper">
          <DictionaryTitle />
          <DictionaryContainer data={pathology} />
        </div>
      </div>
    </>
  );
}
