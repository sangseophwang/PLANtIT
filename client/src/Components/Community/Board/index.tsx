import '../scss/Board.scss';
import Disqus from 'disqus-react';
import Navigation from '../../Common/Navigation';
import { useNavigate } from 'react-router';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faEye);

export default function Board(): JSX.Element {
  const navigate = useNavigate();
  const disqusShortname = 'plantit';
  const disqusConfig = {
    url: `http://localhost:3000/community/1`,
    identifier: 'seop',
    title: '테스트',
  };
  return (
    <section className="Board__Container">
      <Navigation />
      <div className="Board__Top">
        <div className="Board__Information">
          <h1>2021-11-22</h1>
          <h1>
            <FontAwesomeIcon icon={faEye} /> 1,098
          </h1>
        </div>
      </div>
      <div className="Board__Contents">
        Contents
        <button className="Board__Back" onClick={() => navigate('/community')}>
          뒤로 가기
        </button>
      </div>
      <div className="Board__Profile">Profile</div>
      <div className="disqusFrame">
        <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      </div>
    </section>
  );
}
