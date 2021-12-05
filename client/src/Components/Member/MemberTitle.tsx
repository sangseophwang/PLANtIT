import 'Components/Member/scss/MemberTitle.scss';
import TitleImage from 'Assets/Member/MemberTitle.jpg';

export default function MemberTitle() {
  return (
    <>
      <div className="Banner">
        <img src={TitleImage} alt="배너 이미지" />
        <p>저희 팀을 소개합니다!</p>
      </div>
    </>
  );
}
