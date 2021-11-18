import React from 'react';
import '../scss/Modal.scss';
import CloseIcon from '../../../Assets/CloseIcon.svg';

function Modal({ setOpenModal, data }: any) {
  console.log(data);

  // 방제방법 렌더링 함수
  const rendering = () => {
    const result = [];
    for (let i = 0; i < data[4].length; i++) {
      result.push(
        <span key={i}>
          - {data[4][i]}
          <br />
        </span>,
      );
    }
    return result;
  };

  return (
    <div
      className="Modal__Background"
      onClick={() => {
        setOpenModal(false);
      }}
    >
      <div className="Modal__Container">
        <div className="Modal__CloseBtn">
          <img
            className="Modal__Icon"
            src={CloseIcon}
            alt="CloseIcon"
            onClick={() => {
              setOpenModal(false);
            }}
          />
        </div>

        <div className="Modal__Content">
          <img
            className="Modal__Image"
            src="https://images.unsplash.com/photo-1622180203374-9524a54b734d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
            alt="crops"
          />
          <div className="Modal__Body">
            <div className="Pathology__Title">{data[0]}</div>
            <div className="Pathology__Subtitle">{data[1]}</div>
            <div className="Pathology__Explain">
              {data[2]} <br />
            </div>
            <div className="Pathology__Subtitle">발생환경</div>
            <hr style={{ width: '100px' }} />
            <div className="Pathology__Subexplain ">{data[3]} </div>
            <div className="Pathology__Subtitle">방제방법</div>
            <hr style={{ width: '100px' }} />
            <div className="Pathology__Subexplain ">{rendering()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
