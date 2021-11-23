import React, { useState } from 'react';
import Modal from 'Components/Common/Modal';
import 'Components/Dictionary/scss/CropsList.scss';

// React 는 렌더링이 화면에 커밋 된 후에야 모든 효과를 실행한다. 즉 React는 return에서 XXX.map(...)을 반복실행할 때, 첫 턴에 데이터가 아직 안들어와도 렌더링이 실행되며 당연히 그 데이터는 undefined로 정의되어 오류가 나는 것이다.

const CropsList = (props: any) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState('');

  return (
    <>
      <div className="Search__Result">
        {props.data &&
          props.data.map((value: any) => (
            <div className="CropsList__Container-Box">
              <img className="CropsList__Image" src={value.src} alt="crops" />
              <div className="CropsList__Classification">
                <div className="Classification__Name">{value.class}</div>
              </div>

              <div className="CropsList__Name">{value.name}</div>

              <div className="CropsList__Content">{value.name}에 대해 알아보세요</div>

              <div className="CropsList__Click">
                <button
                  className="CropsList__Button"
                  onClick={() => {
                    setModalData(value);
                    setModalOpen(true);
                  }}
                >
                  정보확인
                </button>
              </div>
            </div>
          ))}
      </div>
      {modalOpen && <Modal setOpenModal={setModalOpen} data={modalData} />}
    </>
  );
};

export default CropsList;
