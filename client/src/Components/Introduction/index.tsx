import React from 'react';
import Navigation from 'Components/Common/Navigation';
import Banner from 'Components/Introduction/Banner';
import IntroContent from 'Components/Introduction/IntroContent';

export default function Introduction(): JSX.Element {
  return (
    <div>
      <Navigation />
      <Banner />
      <IntroContent />
    </div>
  );
}
