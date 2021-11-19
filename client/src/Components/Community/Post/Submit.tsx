import '../scss/Submit.scss';

export default function Submit(): JSX.Element {
  return (
    <div className="Submit__Container">
      <h1>현재 시간 : </h1>
      <div className="Submit__Buttons">
        <button>임시저장</button>
        <button>등록하기</button>
      </div>
    </div>
  );
}
