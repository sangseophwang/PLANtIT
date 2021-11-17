import React from 'react';
import '../scss/Modal.scss';

function Modal({ setOpenModal }: any, props: any) {
  console.log(props);
  return (
    <div
      className="Modal__Background"
      onClick={() => {
        setOpenModal(false);
      }}
    >
      <div className="Modal__Container">
        <div className="Modal__CloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>

        <div className="Modal__Content">
          <img
            className="Modal__Image"
            src="https://images.unsplash.com/photo-1622180203374-9524a54b734d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
            alt="crops"
          />
          <div className="Modal__Body">
            <div className="Pathology__Title">Modal Test</div>
            <div className="Pathology__Subtitle">Modal Test</div>
            <div className="Pathology__Explain">
              {props.data} <br />
            </div>
            <div className="Pathology__Subtitle">증상</div>
            <hr style={{ width: '100px' }} />
            <div className="Pathology__Subexplain ">동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세</div>
            <div className="Pathology__Subtitle">방제방법</div>
            <hr style={{ width: '100px' }} />
            <div className="Pathology__Subexplain ">
              - 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세
              <br />
              - 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세
              <br />
              - 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세
              <br />
              - 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
