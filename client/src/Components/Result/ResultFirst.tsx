import 'Components/Result/scss/ResultFirst.scss';

export default function ResultFirst(props: any): JSX.Element {
  const RfirstData = props.data.data;

  return (
    <section className="ResultFirst__Container">
      <div className="ResultFirst__Image-Continer">
        <img
          src={RfirstData.image}
          alt="Analysis__Image"
          className="ResultFirst__Image"
        />
      </div>
      <div className="ResultFirst__Text-continer">
        <div className="Text__Result">Result</div>
        {props.data && (
          <>
            <div className="Disease__Name">{RfirstData.name}</div>
            <div className="Disease__Symptom">
              <span>🌳</span>
              <div>{RfirstData.symptom}</div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
