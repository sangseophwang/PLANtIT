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

export default function Rthird(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState('');

  // 방제방법 렌더링 함수
  const rendering = () => {
    const result = [];
    for (let i = 0; i < props.data.data.prevention.length; i++) {
      result.push(
        <span key={i}>
          - {props.data.data.prevention[i]}
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

      <ReactElasticCarousel breakPoints={breakPoints}>
        {props.data.data.pesticides.map(value => (
          <button
            className="pesticides__Button"
            onClick={() => {
              setModalData(value);
              setModalOpen(true);
              document.body.style.overflow = 'hidden';
            }}
          >
            <img src={value.image} alt="" className="pesticides__Image" />
          </button>
        ))}
      </ReactElasticCarousel>
      {modalOpen && <Rmodal setOpenModal={setModalOpen} data={modalData} />}
    </section>
  );
}
