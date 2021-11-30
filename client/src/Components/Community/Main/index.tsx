import 'Components/Community/scss/Main.scss';
import Logo from 'Assets/logo.png';
import Back from 'Components/Common/Back';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CommunityApi } from 'API/CommunityApi';
import { useState } from 'react';

export default function Community(): JSX.Element {
  const [test, setTest] = useState('');
  const isLoggedin = sessionStorage.getItem('access_token');
  const CustomToastWithLink = () => (
    <div>
      <Link style={{ textDecoration: 'none', color: 'gray' }} to="/login">
        로그인해야 작성하실 수 있습니다.
      </Link>
    </div>
  );
  const handleCreatePost = async () => {
    if (!isLoggedin) {
      toast.error(CustomToastWithLink);
      return;
    } else {
      window.location.replace('/community/post');
    }
  };

  CommunityApi.Post.get('/blog/20').then(response => {
    setTest(response.data.content);
  });
  console.log(test);
  return (
    <section className="Main__Container">
      <div className="Main__Title">
        <Back />
        <img className="Main__Logo-Mobile" src={Logo} alt="로고" />
        <h1>당신의 이야기를 들려주세요.</h1>
        <h3>이 곳은 여러분의 식물과 관련된 이야기를 쓰는 곳입니다.</h3>
        <h3>당신의 지식을 많은 사람들과 공유해보세요.</h3>
        <button onClick={handleCreatePost}>글쓰기</button>
      </div>
    </section>
  );
}
