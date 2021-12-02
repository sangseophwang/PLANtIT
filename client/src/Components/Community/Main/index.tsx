import { useState, useEffect, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CommunityApi } from 'API/CommunityApi';
import Logo from 'Assets/logo.png';
import Back from 'Components/Common/Back';
import Pagination from './Pagination';
import Thumbnail from './Thumbnail';
import 'Components/Community/scss/Main.scss';

export default function Community(): JSX.Element {
  const [length, setLength] = useState<number>();
  const [data, setData] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [order, setOrder] = useState<number>(0);

  // 전체 게시글 수 불러오기
  useEffect(() => {
    async function getLength() {
      let response = await CommunityApi.Get_Page(
        `blog?page=${page}&order=${order}`,
      );
      setLength(response.data.length);
      setData(response.data.blogs);
    }
    getLength();
  }, [page, order]);

  // 페이지 번호 바뀔 때마다 업데이트
  const handlePage = (number: SetStateAction<number>) => {
    setPage(number);
  };

  // 최신순, 조회순 변경 업데이트
  const handleOrder = (number: SetStateAction<number>) => {
    setOrder(number);
  };

  // 로그인하지 않았을 때 팝업창 발생
  const CustomToastWithLink = () => (
    <div>
      <Link style={{ textDecoration: 'none', color: 'gray' }} to="/login">
        로그인해야 작성하실 수 있습니다.
      </Link>
    </div>
  );

  // 로그인 여부 확인하고 페이지 이동
  const handleCreatePost = async () => {
    const isLoggedin = sessionStorage.getItem('access_token');
    if (!isLoggedin) {
      toast.error(CustomToastWithLink);
      return;
    } else {
      window.location.replace('/community/post');
    }
  };

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
      <Thumbnail data={data} length={length} onChangeOrder={handleOrder} />
      <Pagination length={length} page={page} onChangePage={handlePage} />
    </section>
  );
}
