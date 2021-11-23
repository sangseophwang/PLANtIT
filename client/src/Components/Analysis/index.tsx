import React from 'react';
import Navigation from '../Common/Navigation';
import Example from './Example';
import Upload from './Upload';

export default function Analysis(): JSX.Element {
  return (
    <div>
      <Navigation />
      <Upload />
      <Example />
    </div>
  );
}
