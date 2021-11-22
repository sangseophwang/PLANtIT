import React, { useState } from 'react';
import Modal from '../Common/Modal';
import './scss/CropsList.scss';

const CropsList = (props: any) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState('');

  return (
    <>
      <div className="Search__Result">
        {props.data.map((value: any) => (
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
                  setModalData(value.prevention);
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
