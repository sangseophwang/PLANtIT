import '../scss/Main.scss';
import Logo from '../../../Assets/logo.png';
import { useNavigate } from 'react-router';
export default function Title(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="Title__Container">
      <img className="Title__Logo-Mobile" src={Logo} alt="로고" />
      <h1>당신의 이야기를 들려주세요.</h1>
      <h3>이 곳은 여러분의 식물과 관련된 이야기를 쓰는 곳입니다.</h3>
      <h3>당신의 지식을 많은 사람들과 공유해보세요.</h3>
      <button onClick={() => navigate('/community/post')}>글쓰기</button>
    </div>
  );
}
