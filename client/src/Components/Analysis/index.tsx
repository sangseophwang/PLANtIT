import React from 'react';
import Navigation from 'Components/Common/Navigation';
import Example from 'Components/Analysis/Example';
import Upload from 'Components/Analysis/Upload';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Analysis(): JSX.Element {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>검사하기</title>
        </Helmet>
        <div>
          <Navigation />
          <Upload />
          <Example />
        </div>
      </HelmetProvider>
    </>
  );
}
