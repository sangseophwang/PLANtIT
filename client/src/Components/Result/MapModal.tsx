import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CenterMap from 'Components/Common/Map';
import Location from 'Variables/Location';
import 'Components/Result/scss/MapModal.scss';

library.add(faTimes);

export default function MapModal({ setOpenModal }: any): JSX.Element {
  return (
    <>
      <div
        className="Mapmodal__Background"
        onClick={() => {
          setOpenModal(false);
          document.body.style.overflow = 'scroll';
        }}
      />
      <div className="Mapmodal__Container-Test">
        <div className="Mapmodal__Container">
          <div className="Mapmodal__CloseBtn">
            <FontAwesomeIcon
              className="Mapmodal__Icon"
              onClick={() => {
                setOpenModal(false);
                document.body.style.overflow = 'scroll';
              }}
              icon={faTimes}
            />
          </div>
          <div className="Mapmodal__Content">
            치료시설을 찾아보세요 🏥
            <div className="Mapmodal__Notice">위치 엑세스를 허용해 주세요</div>
          </div>

          <CenterMap data={Location} />
        </div>
      </div>
    </>
  );
}
