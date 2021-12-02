import React, { useRef, useState } from 'react';
import 'Components/Contact/scss/Contact.scss';
import Image from 'Assets/ContactImage.jpg';
import Navigation from 'Components/Common/Navigation';
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';
import Logo from 'Assets/logo.png';

export default function Contact(): JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const onChangeNamehandler = (e: any) => {
    setName(e.target.value);
  };

  const onChangeEmailhandler = (e: any) => {
    setEmail(e.target.value);
  };

  const onChangePhonehandler = (e: any) => {
    setPhone(e.target.value);
  };

  const onChangeMessagehandler = (e: any) => {
    setMessage(e.target.value);
  };

  // Email.js
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: any) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_fm88c5d',
        'template_385xp8r',
        e.target,
        'user_Y5QqyfGsA7wWTbXzrErQJ',
      )
      .then(
        result => {
          console.log(result.text);
          toast.success('전송 완료했습니다.', {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        },
        error => {
          console.log(error.text);
          toast.error('전송 실패했습니다.', {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        },
      );

    e.target.reset();
  };

  return (
    <>
      <Navigation />

      <div className="Banner__Container">
        <img src={Image} alt="" className="Banner__Image" />
        <div className="Banner__text">도움이 필요하신가요?</div>
      </div>

      <div className="Contact__Container">
        <div className="Contact__Card">
          <div className="Contact__Content-Container">
            <div className="Contact__Content">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                className="Svg__Image"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div className="Contact__Text">
                서울시 강남구 선릉로 433 세방빌딩 6층
              </div>
            </div>

            <div className="Contact__Content">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                className="Svg__Image"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <div className="Contact__Text">123-456-789</div>
            </div>

            <div className="Contact__Content">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                className="Svg__Image"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <div className="Contact__Text">team3.plant.it@gmail.com</div>
            </div>
          </div>
          <div className="Contact__Email-Container">
            <img src={Logo} alt="" className="Contact__Logo" />
            <form className="Email__Container" ref={form} onSubmit={sendEmail}>
              <div className="Input__Box">
                <label htmlFor="name" className="Input__Label">
                  성함
                </label>
                <input
                  type="text"
                  name="user_name"
                  placeholder=""
                  className="Email__Input"
                  onChange={onChangeNamehandler}
                />
              </div>

              <div className="Input__Box">
                <label htmlFor="email" className="Input__Label">
                  이메일
                </label>
                <input
                  type="email"
                  name="user_email"
                  placeholder=""
                  className="Email__Input"
                  onChange={onChangeEmailhandler}
                />
              </div>

              <div className="Input__Box">
                <label htmlFor="tel" className="Input__Label">
                  연락처
                </label>
                <input
                  type="tel"
                  name="user_tel"
                  placeholder=""
                  className="Email__Input"
                  onChange={onChangePhonehandler}
                />
              </div>
              <label htmlFor="tel" className="Input__Label">
                문의내용
              </label>

              <textarea
                name="message"
                className="Text__Area"
                placeholder=""
                onChange={onChangeMessagehandler}
              />

              {}
              <input
                type="submit"
                value="전송"
                className="Submit__Button"
                disabled={
                  name !== '' && email !== '' && phone !== '' && message !== ''
                    ? false
                    : true
                }
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
