import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { toast } from 'react-toastify';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CommunityApi } from 'API/CommunityApi';
import { useCookies } from "react-cookie";
import Disqus from 'disqus-react';
import Navigation from 'Components/Common/Navigation';
import ProgressBar from 'Components/Common/ProgressBar';
import 'Components/Community/scss/Board.scss';

library.add(faEye);

export default function Board(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state;
  const [data, setData] = useState<any>();
  const [isAuthor, setIsAuthor] = useState<Boolean>(false);
  const modifyProps = [data, item];
  const [cookies, setCookie, removeCookie] = useCookies(['plant-blog']);

  // 게시글 번호에 맞는 글 불러오기
  useEffect(() => {
    async function getPost() {
      
      await CommunityApi.Get_Page(`blog/${item}`, `${cookies['plant-blog']}`).then(response => {
        if (response.data.new_token !== null) {
          console.log('새로운 토큰이 도착했습니다!');
          sessionStorage.removeItem('access_token');
          sessionStorage.setItem('access_token', response.data.new_token);
          setData(response.data);
          setIsAuthor(response.data.is_author);
          setCookie('plant-blog', item)
    
        } else {
          console.log('뉴토큰이 없습니다.');
          setData(response.data);
          setIsAuthor(response.data.is_author);
          setCookie('plant-blog', item)
        }
      });
    }
    getPost();
    
  }, [item]);


  // 게시글 삭제
  async function onDeleteHandler() {
    try {
      await CommunityApi.Community_Post(`blog/delete/${item}`, '').then(
        response => {
          if (response.data.new_token !== null) {
            console.log('새로운 토큰이 도착했습니다!');
            sessionStorage.removeItem('access_token');
            sessionStorage.setItem('access_token', response.data.new_token);
            navigate('/community');
          } else {
            console.log('뉴토큰이 없습니다.');
            navigate('/community');
          }
        },
      );
    } catch (e) {
      toast.error('본인만 삭제할 수 있습니다.');
    }
  }

  // 게시글 수정 페이지 이동
  async function onModifyHandler() {
    console.log(isAuthor);
    if (isAuthor) {
      navigate('/community/post', { state: modifyProps });
    } else {
      toast.error('본인만 수정할 수 있습니다.');
    }
  }

  // DISQUS
  const disqusShortname = 'plantit';
  const disqusConfig = {
    url: `http://localhost:3000/community/${item}`,
    identifier: `${item}`,
    title: `댓글_${item}`,
  };
  return (
    <>
      <section className="Board__Container">
        <Navigation />
        <ProgressBar />
        <div className="Board__Top">
          <div className="Board__Information">
            <h1>{data && data.upload_date}</h1>
            <h1>
              <FontAwesomeIcon icon={faEye} /> {data && data.view}
            </h1>
          </div>
        </div>
        <div className="Board__Contents-Wrapper">
          <h1 className="Board__Title">{data && data.title}</h1>
          <div
            className="Board__Contents"
            dangerouslySetInnerHTML={{ __html: data && data.content }}
          ></div>
        </div>
        <button
          className="Board__Back"
          // eslint-disable-next-line no-sequences
          onClick={() => (window.scrollTo(0, 0), navigate('/community'))}
        >
          뒤로 가기
        </button>
        <div className="Board__Profile">작성자 : {data && data.author}</div>
        <div className="Board__Modify__Delete">
          <button className="Board__Delete" onClick={onDeleteHandler}>
            삭제
          </button>
          <button className="Board__Modify" onClick={onModifyHandler}>
            수정
          </button>
        </div>
        <div className="disqusFrame">
          <Disqus.DiscussionEmbed
            shortname={disqusShortname}
            config={disqusConfig}
          />
        </div>
      </section>
    </>
  );
}
