//@ts-ignore
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'Components/Analysis/scss/Upload.scss';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnalysisApi } from 'API/AnalysisApi';
import { useRef } from 'react';
import Loading from 'Components/Common/Loading';
import Error from 'Components/Common/Error';
import {
  faFileUpload,
  faCheck,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faFileUpload, faCheck, faTimes);

const Upload = (props: any) => {
  const [image, setImage] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadFileValue, setUploadFileValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const ImageInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const UploadText = '잠시만 기다려 주세요';
  const ErrorText = 'API 에러가 발생했습니다';

  // AOS
  useEffect(() => {
    AOS.init();
  });

  // 이미지 업로더 코드
  function ImageChangehandler(e: any) {
    if (e.target.files && e.target.files[0]) {
      setUploadFileValue(e.target.value);
      let reader = new FileReader();

      reader.onload = function (e) {
        if (e.target) {
          setImage(e.target.result as string);
          setIsUploaded(true);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  }

  // 서버로 이미지 Post 전송하는 코드
  const PostAnalysisAPI = async () => {
    // 스크롤 맨 위로
    window.scrollTo(0, 0);

    const formData = new FormData();

    if (ImageInput.current && ImageInput.current.files) {
      const uploadFile = ImageInput.current.files[0];
      formData.append('files', uploadFile);
    }
    setError(null);
    setLoading(true);

    const AnalysisResponse = await AnalysisApi.Post_Analysis(
      'analysis',
      formData,
    )
      .then(response => {
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

  if (loading) return <Loading text={UploadText} />;
  if (error)
    return (
      <>
        <Error text={ErrorText} />
        <Link to="/" className="Button__Home">
          홈으로
        </Link>
      </>
    );

  return (
    <div className="Upload__Layout">
      <div className="Upload__Text-Container">
        <div className="Main__Text">이미지를 넣어보세요!</div>
        <div className="Sub__Text">
          이미지를 넣고 검사를 시작해보세요. <br />
          잠시 후 결과를 확인하실 수 있습니다!
        </div>
        <div className="Crops__Text">
          가능 작물: 고추, 무, 배추, 애호박, 양배추, 오이, 콩, 토마토, 파, 호박
        </div>
      </div>
      <div className="Upload__Container">
        <div className="Upload__Box">
          <div className="Upload__Image">
            {!isUploaded ? (
              <>
                <label htmlFor="Upload__Input">
                  <FontAwesomeIcon icon={faFileUpload} />
                  <div className="Upload-Information">
                    사진을 업로드하세요 🌱
                  </div>
                </label>
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  className="Close__Icon"
                  icon={faTimes}
                  onClick={() => {
                    setIsUploaded(false);
                    setImage('');
                    setUploadFileValue('');
                  }}
                />
                <div className="Image__Preview">
                  <FontAwesomeIcon data-aos="flip-left" icon={faCheck} />
                  <div className="Upload-Information">업로드 성공 🌵</div>
                </div>
              </>
            )}

            <input
              id="Upload__Input"
              type="file"
              accept=".jpg,.jpeg,.png,"
              value={uploadFileValue}
              onChange={ImageChangehandler}
              ref={ImageInput}
            />
          </div>
        </div>
      </div>
      <div className="Button-Continer">
        {isUploaded ? (
          <>
            <Link
              className="Upload__Button"
              to="/result"
              onClick={PostAnalysisAPI}
            >
              검사시작
            </Link>
          </>
        ) : (
          <>
            <div className="Fail__Button">검사시작</div>
          </>
        )}
        <div className="Upload__Count">누적 검사 건수: {props.data}회</div>
      </div>
    </div>
  );
};

export default Upload;
