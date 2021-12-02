import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import 'Components/Community/scss/Board.scss';
import Disqus from 'disqus-react';
import Navigation from 'Components/Common/Navigation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CommunityApi } from 'API/CommunityApi';

library.add(faEye);

export default function Board(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state;
  const [data, setData] = useState<any>();
  const [isAuthor, setIsAuthor] = useState<Boolean>(false);
  console.log(data);
  console.log(`내가 작성한 글이 맞는가?: ${isAuthor}`);

  // 게시글 번호에 맞는 글 불러오기
  useEffect(() => {
    async function getPost() {
      let response = await CommunityApi.Get_Page.get(`/blog/${item}`);
      if (response.data.new_token !== null) {
        console.log('새로운 토큰이 도착했습니다!');
        sessionStorage.removeItem('access_token');
        sessionStorage.setItem('access_token', response.data.new_token);
        setData(response.data);
        setIsAuthor(response.data.is_author);
      } else {
        console.log('뉴토큰이 없습니다.');
        setData(response.data);
        setIsAuthor(response.data.is_author);
      }
    }
    getPost();
  }, [item]);

  // 게시글 삭제
  async function onDeleteHandler() {
    try {
      await CommunityApi.Community_Post.post(`/blog/delete/${item}`).then(
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
      toast.info('오 당신이 적은거 맞는데?');
    } else {
      toast.error('아니잖아!');
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
