/*global kakao*/
import { useEffect } from 'react';
import 'Components/Dictionary/scss/DictionaryModal.scss';
import { Link } from 'react-router-dom';
import { faTimes, faShare } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import KakaoLogo from 'Assets/kakaotalk.svg';
import 'dotenv/config';
//@ts-ignore
import AOS from 'aos';
import 'aos/dist/aos.css';

library.add(faTimes);

declare global {
  interface Window {
    Kakao: any;
  }
}
const { Kakao } = window;

export default function Modal({ setOpenModal, data }: any): JSX.Element {
  useEffect(() => {
    AOS.init();
  });

  const kakaoBtnHandler = () => {
    const jsKey = process.env.REACT_APP_KAKAOSHARE_API_KEY; // Kakao JavaScript Key
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(jsKey);
    }
    window.Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '질병도감',
        description: `${data.name}에 대해 알아보세요`,
        imageUrl: `https://team3-plantit.s3.ap-northeast-2.amazonaws.com/${data.image}`,
        link: {
          mobileWebUrl: `https://elice-kdt-2nd-team3.koreacentral.cloudapp.azure.com/dictionary?name=${data.name}`,
          webUrl: `https://elice-kdt-2nd-team3.koreacentral.cloudapp.azure.com/dictionary?name=${data.name}`,
        },
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: `https://elice-kdt-2nd-team3.koreacentral.cloudapp.azure.com/dictionary?name=${data.name}`,
            webUrl: `https://elice-kdt-2nd-team3.koreacentral.cloudapp.azure.com/dictionary?name=${data.name}`,
          },
        },
      ],
    });
  };

  // 방제방법 렌더링 함수
  const rendering = () => {
    const result = [];
    for (let i = 0; i < data.prevention.length; i++) {
      result.push(
        <span
          key={i}
          style={{
            display: 'flex',
            flexDirection: 'row',
            lineHeight: '1.5',
            wordBreak: 'keep-all',
          }}
        >
          <div style={{ marginRight: '0.2rem' }}>🌱</div>
          {data.prevention[i]}
          <br />
        </span>,
      );
    }
    return result;
  };

  console.log('modal data', data);
  return (
    <>
      <div
        className="Modal__Background"
        onClick={() => {
          setOpenModal(false);
          document.body.style.overflow = 'scroll';
        }}
      />
      <div className="Modal__Container-Test">
        <div
          className="Modal__Container"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="Modal__CloseBtn">
            <Link to="">
              <FontAwesomeIcon
                className="Modal__Icon"
                onClick={() => {
                  setOpenModal(false);
                  document.body.style.overflow = 'scroll';
                }}
                icon={faTimes}
              />
            </Link>
          </div>

          <div className="Modal__Content">
            <img className="Modal__Image" src={data.image} alt="crops" />
            <div className="Modal__Body">
              <div className="Pathology__Title">{data.name}</div>
              <div className="Pathology__Subtitle">{data.english_name}</div>
              <div className="Pathology__Explain">
                {data.symptom} <br />
              </div>
              <div className="Modal__Subtitle">발생환경</div>

              <div className="Pathology__Subexplain">{data.cause} </div>
              <div className="Modal__Subtitle">방제방법</div>

              <div className="Pathology__Subexplain">{rendering()}</div>

              <button className="Kakao__Share">
                <img
                  src={KakaoLogo}
                  alt=""
                  className="KakaoLogo"
                  onClick={kakaoBtnHandler}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
