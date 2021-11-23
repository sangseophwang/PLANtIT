import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Pathology from '../../Assets/Dummy/Pathology';
import Navigation from 'Components/Common/Navigation';
import DictTopSection from 'Components/Dictionary/DictTopSection';
import SearchBar from 'Components/Dictionary/SearchBar';

export default function Dictionary(): JSX.Element {
  // const [pathology, setPathology] = useState([] as any);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // // API로 부터 정보를 받아옴.
  // const GetDictionaryAPI = async () => {
  //   // 요청이 시작 할 때 초기화
  //   setError(null);
  //   setPathology(null);
  //   setLoading(true);
  //   const DictionaryResponse = await axios
  //     .get(`http://localhost:8000/api/disease`)
  //     .then(response => {
  //       setPathology(response.data);
  //     })
  //     .catch(e => {
  //       setError(e);
  //     });
  //   setLoading(false);
  //   return DictionaryResponse;
  // };

  // useEffect(() => {
  //   GetDictionaryAPI();
  // }, []);

  // if (loading)
  //   return (
  //     <div className="Notice__Container">
  //       <div className="loader" />
  //       <div className="Notice__Content">잠시만 기다려 주세요!</div>
  //     </div>
  //   );
  // if (error) return <div className="Notice__error">에러가 발생했습니다</div>;
  // if (!pathology) return null as any;

  return (
    <div>
      <Navigation />
      <DictTopSection />
      <SearchBar data={Pathology} />
    </div>
  );
}
