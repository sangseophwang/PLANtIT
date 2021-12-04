import React, { useState } from 'react';
import 'Components/Result/scss/Rthird.scss';
import ReactElasticCarousel from 'react-elastic-carousel';
import Rmodal from 'Components/Common/Rmodal';

const breakPoints = [
  { width: 300, itemsToShow: 1 },
  { width: 400, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
  { width: 1300, itemsToShow: 5 },
];

// 결과 페이지의 3번째 화면(예방법 & 농약)
export default function Rthird(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState('');

  const RthirdData = props.data.data;

  // 예방법 렌더링 함수
  const rendering = () => {
    const result = [];
    for (let i = 0; i < RthirdData.prevention.length; i++) {
      result.push(
        <span key={i}>
          - {RthirdData.prevention[i]}
          <br />
        </span>,
      );
    }
    return result;
  };

  return (
    <section className="Rthird__Container">
      <div className="Rthird__Text-Container">
        <div className="Rthird__Title">예방법</div>

        <div className="Rthird__Content">{rendering()}</div>
      </div>

      {RthirdData.pesticides.length !== 0 ? (
        <ReactElasticCarousel breakPoints={breakPoints}>
          {RthirdData.pesticides.map(value => (
            <div className="Image">
              <img src={value.image} alt="" className="Pesticides__Image" />
              <div
                className="Image__Overlay Image__Overlay--Primary"
                onClick={() => {
                  setModalData(value);
                  setModalOpen(true);
                  document.body.style.overflow = 'hidden';
                }}
              >
                <div className="Image__Title">{value.name}</div>
                <p className="Image__Description">클릭해보세요!</p>
              </div>
            </div>
          ))}
        </ReactElasticCarousel>
      ) : (
        <div className="No__Result_Text">
          해당 질병에 대한 농약이 존재 하지 않습니다.
        </div>
      )}

      {modalOpen && <Rmodal setOpenModal={setModalOpen} data={modalData} />}
    </section>
  );
}
