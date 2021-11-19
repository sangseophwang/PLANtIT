import React from 'react';
import './scss/Example.scss';

const Example = () => {
  return (
    <div className="Example__container">
      <div className="SubExample__Container">
        <div className="Example__Title">좋은 예</div>
        <div className="Example__Content">
          <img
            src="https://images.unsplash.com/photo-1622180203374-9524a54b734d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
            alt=""
            className="Example__Image"
          />
          <img
            src="https://images.unsplash.com/photo-1622180203374-9524a54b734d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
            alt=""
            className="Example__Image"
          />
          <img
            src="https://images.unsplash.com/photo-1622180203374-9524a54b734d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
            alt=""
            className="Example__Image"
          />

          <div className="Example__Text">
            좋은 예시 문구가 들어갈 공간압니다.
            <br />
            무슨 내용이 들어가야 할까요?
            <br />
            동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세
          </div>
        </div>
      </div>
      <div className="SubExample__Container">
        <div className="Example__Title">나쁜 예</div>
        <div className="Example__Content">
          <img
            src="https://images.unsplash.com/photo-1622180203374-9524a54b734d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
            alt=""
            className="Example__Image"
          />
          <img
            src="https://images.unsplash.com/photo-1622180203374-9524a54b734d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
            alt=""
            className="Example__Image"
          />
          <img
            src="https://images.unsplash.com/photo-1622180203374-9524a54b734d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
            alt=""
            className="Example__Image"
          />

          <div className="Example__Text">
            나쁜 예시 문구가 들어갈 공간압니다.
            <br />
            무슨 내용이 들어가야 할까요?
            <br />
            동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세
          </div>
        </div>
      </div>
    </div>
  );
};

export default Example;
