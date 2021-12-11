import 'Components/Result/scss/ResultFirst.scss';

export default function ResultFirst(props: any): JSX.Element {
  const Data = props.data.data;
  const Level = () => {
    if (Data.level === 1)
      return (
        <div
          className="Result__Level Yellow"
          title="아직은 괜찮으나 초기에 관리해주는 것이 중요합니다!"
        >
          초기
        </div>
      );
    else if (Data.level === 2)
      return (
        <div
          className="Result__Level Orange"
          title="주의가 필요합니다. 하단의 치료 약물을 확인해보세요!"
        >
          중기
        </div>
      );
    else
      return (
        <div
          className="Result__Level Red"
          title="치료가 시급합니다. 우측 하단의 치료소를 찾아보세요!"
        >
          말기
        </div>
      );
  };
  return (
    <section className="ResultFirst__Container">
      <div className="ResultFirst__Image-Container">
        <img
          src={Data.image}
          alt="Analysis__Image"
          className="ResultFirst__Image"
        />
      </div>
      <div className="ResultFirst__Text-container">
        <div className="Text__Result">
          <span>Result</span>
        </div>
        {props.data && (
          <>
            <div className="Disease__Name">{Data.name}</div>
            {Level()}
            <div className="Disease__Symptom">
              <span>🌳</span>
              <div>{Data.symptom}</div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
