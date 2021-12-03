import React from 'react';
import Navigation from 'Components/Common/Navigation';
import Example from 'Components/Analysis/Example';
import Upload from 'Components/Analysis/Upload';
import { Helmet } from 'react-helmet';

export default function Analysis(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>검사하기</title>
      </Helmet>
      <div>
        <Navigation />
        <Upload />
        <Example />
      </div>
    </>
  );
}
