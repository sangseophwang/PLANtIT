import React from 'react';
import '../scss/Modal.scss';

function Modal({ setOpenModal }: any, props: any) {
  console.log(props.data);
  return (
    <div
      className="Modal__Background"
      onClick={() => {
        setOpenModal(false);
      }}
    >
      <div className="Modal__Container">
        <div className="Modal__CloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>

        <div className="Modal__Content">
          <img
            className="Modal__Image"
            src="https://images.unsplash.com/photo-1622180203374-9524a54b734d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80"
            alt="crops"
          />
          <div className="Modal__Body">
            <div className="Pathology__Title">고추탄저병</div>
            <div className="Pathology__Subtitle">(Anthracnose, ripe rot)</div>
            <div className="Pathology__Explain">
              탄저병은 역병과 더불어 고추에 가장 피해가 큰 병해이며 주로 과실에 발생합니다. 고추 탄저병균은 빗물에 튀어 전파되므로 여름철의 잦은 강우와 태풍에 의해 크게 발생합니다. 따라서, 열매가
              맺히기 시작하는 6월 중하순 부터 발생해 장마기와 8~9월에 주의가 필요합니다. <br />
            </div>
            <div className="Pathology__Subtitle">증상</div>
            <hr style={{ width: '100px' }} />
            <div className="Pathology__Subexplain ">
              처음에 과실에 연녹색의 작은 반점이 생기고 점차 둥근 무늬로 확대되는데, 움푹 들어간 궤양 증상으로 나타납니다. 병반에는 흑색의 소립이 생기거나 연홍색의 점질물로 싸인 분생포자 덩이가
              누출되어 나오는데, 이것이 비바람에 다른 과실로 전파됩니다.
            </div>
            <div className="Pathology__Subtitle">방제방법</div>
            <hr style={{ width: '100px' }} />
            <div className="Pathology__Subexplain ">
              - 건전종자를 파종하고, 건전묘를 이식합니다.
              <br />
              - 종자를 소독하여 파종합니다.
              <br />
              - 이 병에 잘 걸리지 않는 품종을 선택하여 재배합니다.
              <br />
              - 등록약제를 병 발생 초기부터 살포합니다. <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
