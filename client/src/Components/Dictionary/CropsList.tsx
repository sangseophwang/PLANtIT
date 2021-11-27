import React, { useState } from 'react';
import Modal from 'Components/Common/Modal';
import 'Components/Dictionary/scss/CropsList.scss';
import { Link } from 'react-router-dom';

const CropsList = (props: any) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState('');

  return (
    <>
      <div className="Search__Result">
        {props.data &&
          props.data.map((value: any) => (
            <div className="CropsList__Container-Box">
              <img
                className="CropsList__Image"
                src="https://images.unsplash.com/photo-1622180203374-9524a54b734d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
                alt="crops"
              />
              <div className="CropsList__Classification">
                <div className="Classification__Name">{value.crops_id}</div>
              </div>

              <div className="CropsList__Name">{value.name}</div>

              <div className="CropsList__Content">
                {value.name}에 대해 알아보세요
              </div>

              <div className="CropsList__Click">
                <button
                  className="CropsList__Button"
                  onClick={() => {
                    setModalData(value);
                    setModalOpen(true);
                    document.body.style.overflow = 'hidden';
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
