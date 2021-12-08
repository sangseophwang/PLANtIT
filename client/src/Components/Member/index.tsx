import Back from 'Components/Common/Back';
import MemberTitle from 'Components/Member/MemberTitle';
import MemberList from 'Components/Member/MemberList';
import { Helmet } from 'react-helmet-async';

export default function Member(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>팀 소개</title>
      </Helmet>
      <Back />
      <MemberTitle />
      <MemberList />
    </>
  );
}
