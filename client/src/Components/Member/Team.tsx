import React from 'react';
import '../Member/scss/Team.scss';

const Team = () => {
  return (
    <section className="Team__Container">
      <div className="Team__Text-Container">
        <p className="Team__Title">저희 팀을 소개합니다.</p>
      </div>
      <div className="Team__Image-Container">
        <img
          src="https://images.unsplash.com/photo-1622180203374-9524a54b734d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
          alt=""
          className="Team__Image"
        />
      </div>
      <div className="Team__Text-Container">
        <p className="Team__Introduction">
          동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세. <br />
          동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세. <br />
          동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세.
          <br />
          동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세.
        </p>
      </div>
    </section>
  );
};

export default Team;
