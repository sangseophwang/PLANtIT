import React from 'react';
import Example from '../Components/Analysis/Example';
import Upload from '../Components/Analysis/Upload';
import Navigation from '../Components/Common/Navigation';

export default function Analysis(): JSX.Element {
  return (
    <div>
      <Navigation />
      <Upload />
      <Example />
    </div>
  );
}
