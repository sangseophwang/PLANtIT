import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import 'Components/Community/scss/Board.scss';
import Disqus from 'disqus-react';
import Navigation from 'Components/Common/Navigation';
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
  useEffect(() => {
    async function getBoard() {
      let response = await CommunityApi.Get_Page.get(`/blog/${item}`);
      setData(response.data);
    }
    getBoard();
  }, [item]);
  console.log(data && data.content);
  // DISQUS
  const disqusShortname = 'plantit';
  const disqusConfig = {
    url: `http://localhost:3000/community/${item}`,
    identifier: `${item}`,
    title: `댓글_${item}`,
  };
  return (
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
      <div className="disqusFrame">
        <Disqus.DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
      </div>
    </section>
  );
}
