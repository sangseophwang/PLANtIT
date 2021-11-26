import React, { useEffect, useState } from 'react';
import Navigation from 'Components/Common/Navigation';
import 'Components/Result/scss/Result.scss';
import Rfirst from 'Components/Result/Rfirst';
import Rsecond from 'Components/Result/Rsecond';
import Rthird from 'Components/Result/Rthird';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Rlast from './Rlast';

export default function Result(): JSX.Element {
  // API로 부터 질병 진단 정보를 받아오는 Axios GET 코드.

  // const [result, setResult] = useState([] as any);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  // // API로 부터 정보를 받아옴.
  // const GetResultAPI = async () => {
  //   // 요청이 시작 할 때 초기화
  //   setError(null);
  //   setResult(null);
  //   setLoading(true);
  //   const ResultResponse = await axios
  //     .get(`http://localhost:8000/api/아직 미정`)
  //     .then(response => {
  //       setResult(response.data);
  //     })
  //     .catch(e => {
  //       setError(e);
  //     });
  //   setLoading(false);
  //   return ResultResponse;
  // };

  // useEffect(() => {
  //   GetResultAPI();
  // }, []);

  // if (loading)
  //   return <div className="Notice__Container">잠시만 기다려 주세요</div>;
  // if (error)
  //   return (
  //     <>
  //       <div className="Notice__Container">API 에러가 발생했습니다</div>
  //       <Link to="/Analysis" className="Button__Home">
  //         뒤로가기
  //       </Link>
  //     </>
  //   );
  // if (!result) return null as any;

  return (
    <div className="Result__Container">
      <Navigation />
      <Rfirst />
      <Rsecond />
      <Rthird />
      <Rlast />
    </div>
  );
}
