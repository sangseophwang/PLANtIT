import 'Components/Member/scss/MemberTitle.scss';
import TitleImage from 'Assets/MemberTitle.jpg';

export default function MemberTitle() {
  return (
    <section className="Team__Container">
      <img src={TitleImage} alt="" className="Team__Image" />
      <p className="Team__Title">저희 팀을 소개합니다!</p>
    </section>
  );
}
