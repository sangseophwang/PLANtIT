import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CloseIcon from 'Assets/CloseIcon.svg';
import FolderIcon from 'Assets/folder_icon_transparent.png';
import 'Components/Analysis/scss/Upload.scss';

const Upload = () => {
  const [image, setImage] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);
  const [typeFile, setTypeFile] = useState('');

  function ImageChangehandler(e) {
    if (e.target.files && e.target.files[0]) {
      setTypeFile(e.target.files[0].type);
      let reader = new FileReader();

      reader.onload = function (e) {
        setImage(e.target.result);
        setIsUploaded(true);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  }

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
            <div className="Upload__Button">
              <Link
                style={{ textDecoration: 'none', color: 'white' }}
                to="/result"
              >
                검사시작
              </Link>
            </div>
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

                <input
                  id="upload-input"
                  type="file"
                  accept=".jpg,.jpeg,.png,"
                  onChange={ImageChangehandler}
                />
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
          </div>
        </div>

        {/* {isUploaded ? <div className="Upload-Information">{typeFile}파일 입니다.</div> : null} */}

        <div className="Upload-Information">
          가능한 확장자: .jpg / .jpeg / .png
        </div>
      </div>
    </div>
  );
};

export default Upload;
