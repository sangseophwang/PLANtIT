import React from 'react';
import CloseIcon from 'Assets/CloseIcon.svg';
import 'Components/Common/scss/Rmodal.scss';

const Rmodal = ({ setOpenModal, data }: any) => {
  // 주요특성, 기타정보 렌더링 함수
  const rendering = (value: any) => {
    const result = [];
    for (let i = 0; i < value.length; i++) {
      result.push(
        <span
          key={i}
          style={{
            display: 'flex',
            flexDirection: 'row',
            lineHeight: '1.5',
            wordBreak: 'keep-all',
          }}
        >
          <div style={{ marginRight: '0.2rem' }}>✔</div>
          {value[i]}
          <br />
        </span>,
      );
    }
    return result;
  };

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
            <img className="Rmodal__Image" src={data.image} alt="crops" />
            <div className="Rmodal__Body">
              <div className="Pesticide__Description">{data.description}</div>
              <div className="Pesticide__Title">{data.name}</div>

              <div className="Pesticide__Feature">
                <span style={{ fontWeight: 'bold' }}>유효성분: </span>
                {data.component}
              </div>

              <div className="Pesticide__Feature">
                <span style={{ fontWeight: 'bold' }}>계통: </span>
                {data.kind}
              </div>

              <div className="Pesticide__Feature">
                <span style={{ fontWeight: 'bold' }}>포장단위: </span>
                {data.packing_unit}
              </div>

              <div className="Pesticide__Subtitle">주요특성</div>

              <div className="Pesticide__Explain">
                {rendering(data.attribute)}
              </div>
              <div className="Pesticide__Subtitle">기타정보</div>

              <div className="Pesticide__Explain ">
                {rendering(data.information)}
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
