import '../scss/Submit.scss';

export default function Submit(): JSX.Element {
  return (
    <footer className="Submit__Container">
      <div className="Submit__Wrapper">
        <h1 className="Submit__Time">현재 시간 : </h1>
        <div className="Submit__Buttons">
          <button>취소</button>
          <button>등록하기</button>
        </div>
      </div>
    </footer>
  );
}
