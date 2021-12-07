import 'Components/Result/scss/ResultSecond.scss';
import level0 from 'Assets/Analysis_Result/Level/level0.png';
import level1 from 'Assets/Analysis_Result/Level/level1.png';
import level2 from 'Assets/Analysis_Result/Level/level2.png';
import level3 from 'Assets/Analysis_Result/Level/level3.png';

export default function ResultSecond(props: any): JSX.Element {
  const ResultSecondData = props.data.data;

  // 피해 정도 렌더링 함수
  const rendering = () => {
    if (ResultSecondData.level === 0) {
      return (
        <>
          <img className="Certificate__Image" src={level0} alt="" />
          <div className="Certificate__Content">
            <span>0단계🌱</span>
            <br /> 입니다.
          </div>
        </>
      );
    } else if (ResultSecondData.level === 1) {
      return (
        <>
          <img className="Certificate__Image" src={level1} alt="" />
          <div className="Certificate__Content">
            <span>1단계🍂</span>
            <br /> 입니다.
          </div>
        </>
      );
    } else if (ResultSecondData.level === 2) {
      return (
        <>
          <img className="Certificate__Image" src={level2} alt="" />
          <div className="Certificate__Content">
            <span>2단계🤒</span>
            <br /> 입니다.
          </div>
        </>
      );
    } else {
      return (
        <>
          <img className="Certificate__Image" src={level3} alt="" />
          <div className="Certificate__Content">
            <span>3단계🔥</span>
            <br /> 입니다.
          </div>
        </>
      );
    }
  };

  return (
    <section
      className={`ResultSecond__Container Level${ResultSecondData.level}`}
    >
      <div className="ResultSecond__Title">현재 피해 정도는 💉</div>
      {rendering()}
    </section>
  );
}
