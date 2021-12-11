import React from 'react';
import 'Components/Analysis/scss/AnalysisModal.scss';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Example from './Example';

library.add(faTimes);
export default function AnalysisModal({
  setOpenModal,
  data,
}: any): JSX.Element {
  return (
    <>
      <div
        className="Rmodal__Background"
        onClick={() => {
          setOpenModal(false);
          document.body.style.overflow = 'scroll';
        }}
      />
      <div className="Amodal__Container-Test">
        <div className="Amodal__Container">
          <div className="Amodal__CloseBtn">
            <FontAwesomeIcon
              className="Amodal__Icon"
              onClick={() => {
                setOpenModal(false);
                document.body.style.overflow = 'scroll';
              }}
              icon={faTimes}
            />
          </div>

          <div className="Amodal__Content">
            <Example />
          </div>
        </div>
      </div>
    </>
  );
}
