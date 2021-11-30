import React from 'react';

import Footer from 'Components/Common/Footer';
import Navigation from 'Components/Common/Navigation';
import MypageMain from './Mypage';

export default function Mypage(): JSX.Element {
  return (
    <>
      <Navigation />
      <MypageMain />
      <Footer />
    </>
  );
}
