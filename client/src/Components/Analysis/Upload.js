import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CloseIcon from 'Assets/CloseIcon.svg';
import FolderIcon from 'Assets/folder_icon_transparent.png';
import 'Components/Analysis/scss/Upload.scss';
import axios from 'axios';
import { useRef } from 'react';

const Upload = () => {
  const [image, setImage] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [result, setResult] = useState('');

  const ImageInput = useRef(null);
  const navigate = useNavigate();

  // 이미지 업로더 코드
  function ImageChangehandler(e) {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();

      reader.onload = function (e) {
        setImage(e.target.result);
        setIsUploaded(true);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  }

  // 서버로 이미지 Post 전송하는 코드

  const PostAnalysisAPI = async () => {
    // 스크롤 맨 위로
    window.scrollTo(0, 0);

    const formData = new FormData();

    const uploadFile = ImageInput.current.files[0];
    formData.append('files', uploadFile);
    console.log(formData.get('files'));

    setError(null);
    setLoading(true);

    const AnalysisResponse = await axios
      .post(
        `http://elice-kdt-2nd-team3.koreacentral.cloudapp.azure.com/api/analysis`,
        formData,
      )
      .then(response => {
        // setResult(response.data);
        console.log('검사하기 페이지', response.data);
        navigate('/result', { state: response.data });
      })
      .catch(e => {
        setError(e);
      });
    setLoading(false);

    return AnalysisResponse;
  };

  useEffect(() => {
    return () => setLoading(false);
  }, []);

  if (loading)
    return <div className="Notice__Container">잠시만 기다려 주세요</div>;
  if (error)
    return (
      <>
        <div className="Notice__Container">API 에러가 발생했습니다</div>
        <Link to="/" className="Button__Home">
          홈으로
        </Link>
      </>
    );

  return (
    <div className="Upload__Layout">
      <div className="Upload__Text-Container">
        <div className="Main__Text">이미지를 넣어보세요</div>
        <div className="Sub__Text">
          동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세
          (후렴)무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세 남산위에
          저 소나무 철갑을 두른듯 바람서리 불변함은 우리기상 일세 (후렴)무궁화
          삼천리 화려강산 대한사람 대한으로 길이보전하세
        </div>

        <div className="Crops__Text">
          가능 작물: 고추, 무, 배추, 애호박, 양배추, 오이, 콩, 토마토, 파, 호박
        </div>

        <div className="Button-Continer">
          {isUploaded ? (
            <Link
              className="Upload__Button"
              style={{
                textDecoration: 'none',
                color: 'white',
                display: 'block',
                width: '100%',
              }}
              to="/result"
              onClick={PostAnalysisAPI}
            >
              검사시작
            </Link>
          ) : (
            <div className="Fail__Button">검사시작</div>
          )}
        </div>
      </div>
      <div className="Upload__Container">
        <div className="Upload__Box">
          <div className="Upload__Image">
            {!isUploaded ? (
              <>
                <label htmlFor="upload-input">
                  <img
                    src={FolderIcon}
                    draggable={'false'}
                    alt="placeholder"
                    style={{ width: 100, height: 100 }}
                  />
                  <p style={{ color: '#444' }}>작물이미지를 넣어보세요.</p>
                </label>
              </>
            ) : (
              <div className="Image__Preview">
                <img
                  className="close-icon"
                  src={CloseIcon}
                  alt="CloseIcon"
                  onClick={() => {
                    setIsUploaded(false);
                    setImage(null);
                  }}
                />
                {
                  <img
                    id="uploaded-image"
                    src={image}
                    draggable={false}
                    alt="uploaded-img"
                  />
                }
              </div>
            )}

            <input
              id="upload-input"
              type="file"
              accept=".jpg,.jpeg,.png,"
              onChange={ImageChangehandler}
              ref={ImageInput}
            />
          </div>
        </div>

        <div className="Upload-Information">
          가능한 확장자: .jpg / .jpeg / .png
        </div>
      </div>
    </div>
  );
};

export default Upload;
