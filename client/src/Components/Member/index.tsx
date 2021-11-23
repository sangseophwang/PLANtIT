import React from 'react';
import MemberList from 'Components/Member/MemberList';
import Team from 'Components/Member/Team';

export default function Member(): JSX.Element {
  return (
    <div>
      <Team />
      <MemberList />
    </div>
  );
}
