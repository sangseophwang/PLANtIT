import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Back from 'Components/Common/Back';
import { authApi } from 'API/AuthApi/index';

import 'Components/Auth/scss/Register.scss';
import Logo from 'Assets/logo.png';
import SignImage from 'Assets/Auth/login_side_image.jpeg';

function RegisterPage(): JSX.Element {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [msg, setMsg] = useState('');

  const passwordFormMessage: JSX.Element = (
    <div>
      올바르지 않는 패스워드입니다<br></br>
      올바른 패스워드 양식이란?<br></br>
      8자 이상, 영문 숫자 특수기호<br></br>
      9자 이하: 영문, 숫자, 특수기호<br></br>
      10자 이상: 셋 중 두가지 포함
    </div>
  );

  const navigate = useNavigate();

  function onChangeInputHandler(event: {
    target: { name: any; value: string };
  }): void {
    const [name, value] = [event.target.name, event.target.value];
    switch (name) {
      case 'id':
        setId(value);
        break;
      case 'name':
        setName(value);
        break;
      case 'password':
        setPassword(value);
        value !== repeatPassword
          ? setMsg('"비밀번호 확인"과 일치하는지 확인해주세요.')
          : setMsg('');
        break;
      case 'repeatPassword':
        setRepeatPassword(value);
        password !== value
          ? setMsg('"비밀번호"와 일치하는지 확인해주세요.')
          : setMsg('');
    }
  }

  function onClickSubmitHandler(event: { preventDefault: () => void }): void {
    event.preventDefault();

    console.log('id :', id);
    console.log('name : ', name);
    console.log('password : ', password);
    console.log('repeat password : ', repeatPassword);
    // isValidateForm() ? :
    authApi.requestDjango
      .post('/user/register', {
        email: id,
        password1: password,
        password2: repeatPassword,
        nickname: name,
      })
      .then(response => {
        console.log('성공', response);
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        response.data === 'Register Success'
          ? (navigate('/login'),
            toast.success('회원가입 성공!', {
              position: toast.POSITION.TOP_CENTER,
            }))
          : alert('fail register');
      })
      .catch(error => {
        console.log('실패', error);
        console.log('error.response: ', error.response);
        let errorMessage: string | JSX.Element = '';
        switch (error.response.data) {
          case 'Register Fail':
            errorMessage = '회원가입 양식을 모두 적어주세요.';

            break;
          case 'Invalid Email':
            errorMessage = '잘못된 이메일 형식입니다.';
            break;
          case 'Invalid Password':
            errorMessage = passwordFormMessage;
            break;
          case 'Password Not Same':
            errorMessage = '비밀번호가 일치하는지 확인해주세요.';
            break;
          case 'Already Exist':
            errorMessage = '이미 등록된 이메일입니다.';
            break;
        }
        toast.error(
          <div>
            {errorMessage}
            <br />
          </div>,
          {
            position: toast.POSITION.TOP_CENTER,
          },
        );
      });
  }

  const formContents = [
    {
      labelHtmlFor: 'id',
      labelValue: '아이디',
      inputType: 'email',
      inputName: 'id',
      inputPlaceHolder: '아이디를 입력해주세요.',
      inputValue: id,
      inputOnChange: onChangeInputHandler,
    },
    {
      labelHtmlFor: 'name',
      labelValue: '닉네임',
      inputType: 'text',
      inputPlaceHolder: '닉네임을 입력해주세요.',
      inputName: 'name',
      inputValue: name,
      inputOnChange: onChangeInputHandler,
    },
    {
      labelHtmlFor: 'password',
      labelValue: '비밀번호',
      inputType: 'password',
      inputPlaceHolder: '비밀번호를 입력해주세요.',
      inputName: 'password',
      inputValue: password,
      inputOnChange: onChangeInputHandler,
    },

    {
      labelHtmlFor: 'repeatPassword',
      labelValue: '비밀번호 확인',
      inputType: 'password',
      inputPlaceHolder: '비밀번호를 입력해주세요.',
      inputName: 'repeatPassword',
      inputValue: repeatPassword,
      inputOnChange: onChangeInputHandler,
    },
  ];

  return (
    <div className="Component__Container">
      <div className="RegisterPage__Container">
        <div className="Side__Image-Wrapper">
          <img src={SignImage} alt="" className="Side__Image" />
        </div>
        <div className="Register__Container">
          <Back />
          <img src={Logo} alt="" className="Plaintit__logo-Image" />

          {formContents.map((valueList, index) => (
            <div className="Form__Content-Wrapper" key={index}>
              <div className="Form__Label-Wrapper">
                <label className="Form__Label" htmlFor={valueList.labelHtmlFor}>
                  {valueList.labelValue}
                </label>
              </div>
              <input
                autoComplete="off"
                className="Register__Input"
                type={valueList.inputType}
                name={valueList.inputName}
                placeholder={valueList.inputPlaceHolder}
                value={valueList.inputValue}
                onChange={valueList.inputOnChange}
                required
              />
            </div>
          ))}
          <span className="Password__Message">{msg}</span>
          <div className="Submit__Form-Wrapper">
            <div></div>
            <button
              className="Plantit__Register-Button"
              type="button"
              onClick={onClickSubmitHandler}
            >
              회원가입
            </button>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RegisterPage;
