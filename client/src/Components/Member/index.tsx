import React from 'react';
import MemberList from './MemberList';
import Team from './Team';

export default function Member(): JSX.Element {
  return (
    <div>
      <Team />
      <MemberList />
    </div>
  );
}
