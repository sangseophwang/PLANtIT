import 'Components/Dictionary/scss/DictionaryModal.scss';
import CloseIcon from 'Assets/CloseIcon.svg';
import { Link } from 'react-router-dom';

function Modal({ setOpenModal, data }: any) {
  // 방제방법 렌더링 함수
  const rendering = () => {
    const result = [];
    for (let i = 0; i < data.prevention.length; i++) {
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
          {data.prevention[i]}
          <br />
        </span>,
      );
    }
    return result;
  };

  return (
    <>
      <div
        className="Modal__Background"
        onClick={() => {
          setOpenModal(false);
          document.body.style.overflow = 'scroll';
        }}
      />
      <div className="Modal__Container-Test">
        <div className="Modal__Container">
          <div className="Modal__CloseBtn">
            <Link to="">
              <img
                className="Modal__Icon"
                src={CloseIcon}
                alt="CloseIcon"
                onClick={() => {
                  setOpenModal(false);
                  document.body.style.overflow = 'scroll';
                }}
              />
            </Link>
          </div>

          <div className="Modal__Content">
            <img className="Modal__Image" src={data.image} alt="crops" />
            <div className="Modal__Body">
              <div className="Pathology__Title">{data.name}</div>
              <div className="Pathology__Subtitle">{data.english_name}</div>
              <div className="Pathology__Explain">
                {data.symptom} <br />
              </div>
              <div className="Modal__Subtitle">발생환경</div>

              <div className="Pathology__Subexplain">{data.cause} </div>
              <div className="Modal__Subtitle">방제방법</div>

              <div className="Pathology__Subexplain">{rendering()}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
