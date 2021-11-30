import React from 'react';
import 'Components/Result/scss/Rfirst.scss';

const Rfirst = (props: any) => {
  return (
    <section className="Rfirst__Container">
      <div className="Rfirst__Image-continer">
        <img src={props.data.data.image} alt="asd" className="Rfirst__Image" />
      </div>
      <div className="Rfirst__Text-continer">
        <div className="Crops__class">Result</div>
        {props.data && (
          <>
            <div className="Disease__Title">{props.data.data.name}</div>
            <div className="Disease__Content">{props.data.data.symptom}</div>
          </>
        )}
      </div>
    </section>
  );
};

export default Rfirst;
