import Navigation from 'Components/Common/Navigation';
import Banner from 'Components/Introduction/Banner';
import IntroContent from 'Components/Introduction/IntroContent';
import { Helmet } from 'react-helmet-async';

export default function Introduction(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>서비스 소개</title>
      </Helmet>
      <Navigation />
      <Banner />
      <IntroContent />
    </>
  );
}
