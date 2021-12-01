import React, { useEffect, useState } from 'react';
import Modal from 'Components/Common/Modal';
import 'Components/Dictionary/scss/CropsList.scss';
import { Link } from 'react-router-dom';

const CropsList = (props: any) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState('');

  useEffect(() => {
    if (!props.data) {
      return;
    }
    const current_url = window.location.href.includes('?name=');
    const disease_name = decodeURI(window.location.href.split('=')[1]);

    if (current_url) {
      const need = props.data.filter((val: any) => val.name === disease_name);
      setModalData(need[0]);
      setModalOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="Search__Result">
        {props.data &&
          props.data.map((value: any) => (
            <div className="CropsList__Container-Box" key={value.id}>
              <img className="CropsList__Image" src={value.image} alt="crops" />
              <div className="CropsList__Classification">
                <div className="Classification__Name">{value.crops_id}</div>
              </div>

              <div className="CropsList__Name">{value.name}</div>

              <div className="CropsList__Content">
                {value.name}에 대해 알아보세요
              </div>

              <div className="CropsList__Click">
                <Link
                  style={{ textDecoration: 'none' }}
                  to={window.location.pathname + `?name=${value.name}`}
                  className="CropsList__Button"
                  onClick={() => {
                    setModalData(value);
                    setModalOpen(true);
                    document.body.style.overflow = 'hidden';
                  }}
                >
                  정보확인
                </Link>
              </div>
            </div>
          ))}
      </div>
      {modalOpen && <Modal setOpenModal={setModalOpen} data={modalData} />}
    </>
  );
};

export default CropsList;
