import Back from 'Components/Common/Back';
import MemberTitle from 'Components/Member/MemberTitle';
import MemberList from 'Components/Member/MemberList';

export default function Member(): JSX.Element {
  return (
    <>
      <Back />
      <MemberTitle />
      <MemberList />
    </>
  );
}
