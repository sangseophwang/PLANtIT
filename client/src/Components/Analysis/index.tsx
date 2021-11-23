import React from 'react';
import Navigation from 'Components/Common/Navigation';
import Example from 'Components/Analysis/Example';
import Upload from 'Components/Analysis/Upload';

export default function Analysis(): JSX.Element {
  return (
    <div>
      <Navigation />
      <Upload />
      <Example />
    </div>
  );
}
