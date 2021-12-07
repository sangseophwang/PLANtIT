import React from 'react';
import 'Components/Result/scss/Rfirst.scss';

const Rfirst = (props: any) => {
  const RfirstData = props.data.data;

  return (
    <section className="Rfirst__Container">
      <div className="Rfirst__Image-Continer">
        <img
          src={RfirstData.image}
          alt="Analysis__Image"
          className="Rfirst__Image"
        />
      </div>
      <div className="Rfirst__Text-continer">
        <div className="Text__Result">Result</div>
        {props.data && (
          <>
            <div className="Disease__Name">{RfirstData.name}</div>
            <div className="Disease__Symptom">{RfirstData.symptom}</div>
          </>
        )}
      </div>
    </section>
  );
};

export default Rfirst;
