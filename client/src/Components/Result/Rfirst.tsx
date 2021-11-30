import React from 'react';
import 'Components/Result/scss/Rfirst.scss';

const Rfirst = (props: any) => {
  return (
    <section className="Rfirst__Container">
      <div className="Rfirst__Image-continer">
        <img
          src="https://images.unsplash.com/photo-1622180203374-9524a54b734d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
          alt="asd"
          className="Rfirst__Image"
        />
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
