import React from 'react';
import CloseIcon from 'Assets/CloseIcon.svg';
import 'Components/Common/scss/Rmodal.scss';

const Rmodal = ({ setOpenModal }: any) => {
  return (
    <>
      <div
        className="Rmodal__Background"
        onClick={() => {
          setOpenModal(false);
          document.body.style.overflow = 'scroll';
        }}
      />
      <div className="Rmodal__Container-Test">
        <div className="Rmodal__Container">
          <div className="Rmodal__CloseBtn">
            <img
              className="Rmodal__Icon"
              src={CloseIcon}
              alt="CloseIcon"
              onClick={() => {
                setOpenModal(false);
                document.body.style.overflow = 'scroll';
              }}
            />
          </div>

          <div className="Rmodal__Content">
            <img
              className="Rmodal__Image"
              src="https://images.unsplash.com/photo-1622180203374-9524a54b734d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
              alt="crops"
            />
            <div className="Rmodal__Body">
              <div className="Pesticide__Description">종합살균제</div>
              <div className="Pesticide__Title">캡틴에이 입상수화제</div>

              <div className="Pesticide__Feature">
                유효성분: Polyoxin D zinc salt 5%
              </div>
              <div className="Pesticide__Feature">
                계통: 트리할로메칠치오계, 스트로빌루린계
              </div>
              <div className="Pesticide__Feature">포장단위: 500g</div>

              <div className="Pesticide__Subtitle">주요특성</div>
              <hr style={{ width: '100px' }} />
              <div className="Pesticide__Explain">
                - 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라
                만세.
                <br />
                - 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라
                만세.
                <br />
                - 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라
                만세.
                <br />
              </div>
              <div className="Pesticide__Subtitle">기타정보</div>
              <hr style={{ width: '100px' }} />
              <div className="Pesticide__Explain ">
                - 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라
                만세.
                <br />
                - 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라
                만세.
                <br />
                - 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라
                만세.
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rmodal;
