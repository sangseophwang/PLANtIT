import Navigation from 'Components/Common/Navigation';
import MypageMain from './Mypage';
import { Helmet } from 'react-helmet-async';

export default function Mypage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>마이페이지</title>
      </Helmet>
      <Navigation />
      <MypageMain />
    </>
  );
}
