import React from 'react';
import './scss/Community.scss';
import Navigation from '../Components/Common/Navigation';
import Title from '../Components/Community/Community_Title';
import Footer from '../Components/Common/Footer';

export default function Community(): JSX.Element {
  return (
    <div className="Community__Container">
      <Navigation />
      <Title />
      {/* <Footer /> */}
    </div>
  );
}
