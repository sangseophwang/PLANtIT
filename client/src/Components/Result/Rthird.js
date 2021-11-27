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

export default function Rthird() {
  const [modalOpen, setModalOpen] = useState(false);
  // const [modalData, setModalData] = useState('');

  return (
    <section className="Rthird__Container">
      <div className="Rthird__Text-Container">
        <div className="Rthird__Title">예방법</div>
        <div className="Rthird__Content">
          - 평소에 물 많이 주고 추운 곳에 두지 마세요.
          <br />- 따뜻하게 해주고 좋은 흙에서 자랄 수 있도록 영양분이 높은
          비료를 주세요.
        </div>
      </div>

      <ReactElasticCarousel breakPoints={breakPoints}>
        <button
          className="pesticides__Button"
          onClick={() => {
            setModalOpen(true);
            document.body.style.overflow = 'hidden';
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1622180203374-9524a54b734d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
            alt=""
            className="pesticides__Image"
          />
        </button>

        <button
          className="pesticides__Button"
          onClick={() => {
            setModalOpen(true);
            document.body.style.overflow = 'hidden';
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1622180203374-9524a54b734d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
            alt=""
            className="pesticides__Image"
          />
        </button>

        <button
          className="pesticides__Button"
          onClick={() => {
            setModalOpen(true);
            document.body.style.overflow = 'hidden';
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1622180203374-9524a54b734d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
            alt=""
            className="pesticides__Image"
          />
        </button>

        <button
          className="pesticides__Button"
          onClick={() => {
            setModalOpen(true);
            document.body.style.overflow = 'hidden';
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1622180203374-9524a54b734d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
            alt=""
            className="pesticides__Image"
          />
        </button>

        <button
          className="pesticides__Button"
          onClick={() => {
            setModalOpen(true);
            document.body.style.overflow = 'hidden';
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1622180203374-9524a54b734d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
            alt=""
            className="pesticides__Image"
          />
        </button>
      </ReactElasticCarousel>
      {modalOpen && <Rmodal setOpenModal={setModalOpen} />}
    </section>
  );
}
