import { useRef, useState } from 'react';
import 'Components/Contact/scss/Contact.scss';
import Navigation from 'Components/Common/Navigation';
import Logo from 'Assets/logo.png';
import Image from 'Assets/ContactImage.jpg';
import emailjs from 'emailjs-com';
import ContactList from 'Variables/ContactList';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

  const Contact = [
    {
      key: 1,
      id: 'user_name',
      name: '성함',
      type: 'text',
      onChange: onChangeNamehandler,
    },
    {
      key: 2,
      id: 'user_email',
      name: '이메일',
      type: 'email',
      onChange: onChangeEmailhandler,
    },
    {
      key: 3,
      id: 'user_tel',
      name: '연락처',
      type: 'tel',
      onChange: onChangePhonehandler,
    },
  ];

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
      <Helmet>
        <title>문의하기</title>
      </Helmet>
      <Navigation />
      <div className="Banner">
        <img src={Image} alt="배너 이미지" />
        <p>도움이 필요하신가요?</p>
      </div>

      <div className="Contact__Container">
        <div className="Contact__Card">
          <div className="Contact__Content-Container">
            {ContactList.map(data => (
              <div className="Contact__Content" key={data.key}>
                <FontAwesomeIcon icon={data.icon} />
                <span style={{ wordBreak: 'keep-all' }}>{data.content}</span>
              </div>
            ))}
          </div>

          <div className="Contact__Email-Container">
            <img src={Logo} alt="" className="Contact__Logo" />
            <form className="Email__Container" ref={form} onSubmit={sendEmail}>
              {Contact.map(data => (
                <div className="Input__Box" key={data.key}>
                  <label className="Input__Label" htmlFor={data.id}>
                    {data.name}
                  </label>
                  <input
                    className="Email__Input"
                    name={data.id}
                    type={data.type}
                    id={data.id}
                    onChange={data.onChange}
                  />
                </div>
              ))}
              <label htmlFor="text" className="Input__Label">
                문의내용
              </label>
              <textarea
                id="text"
                name="message"
                className="Text__Area"
                onChange={onChangeMessagehandler}
              />
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
