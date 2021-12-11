import { useState } from 'react';
import 'Components/Result/scss/ResultSecond.scss';
import ReactElasticCarousel from 'react-elastic-carousel';
import ResultModal from './ResultModal';

const breakPoints = [
  { width: 300, itemsToShow: 1 },
  { width: 400, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
  { width: 1300, itemsToShow: 5 },
];

// 결과 페이지의 3번째 화면(예방법 & 농약)
export default function ResultSecond(props: any) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState('');

  const ResultSecondData = props.data.data;

  // 예방법 렌더링 함수
  const rendering = () => {
    const result = [];
    for (let i = 0; i < ResultSecondData.prevention.length; i++) {
      result.push(
        <span key={i}>
          <div>🌵</div> {ResultSecondData.prevention[i]}
          <br />
        </span>,
      );
    }
    return result;
  };

  return (
    <section className="ResultSecond__Container">
      <div className="ResultSecond__Text-Container">
        <div className="ResultSecond__Title">예방법 🧑🏻‍🔬</div>
        <div className="ResultSecond__Content">{rendering()}</div>
      </div>

      {ResultSecondData.pesticides.length !== 0 ? (
        <ReactElasticCarousel breakPoints={breakPoints} isRTL={true}>
          {ResultSecondData.pesticides.map((value: any) => (
            <div className="Image" key={value.id}>
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
                <p className="Image__Description">👆🏻</p>
              </div>
            </div>
          ))}
        </ReactElasticCarousel>
      ) : (
        <div className="No__Result_Text">
          해당 질병에 대한 농약이 존재 하지 않습니다.
        </div>
      )}

      {modalOpen && (
        <ResultModal setOpenModal={setModalOpen} data={modalData} />
      )}
    </section>
  );
}
