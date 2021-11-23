import React from 'react';
import Navigation from '../Common/Navigation';
import Banner from './Banner';
import IntroContent from './IntroContent';

export default function Introduction(): JSX.Element {
  return (
    <div>
      <Navigation />
      <Banner />
      <IntroContent />
    </div>
  );
}
