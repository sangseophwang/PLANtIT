import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoMain from './GoMain';
import { authApi } from '.';

import './scss/Register.scss';
import Logo from '../../Assets/logo.png';
import { faUserAlt, faKey } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faUserAlt, faKey);

function RegisterPage(): JSX.Element {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  function onChangeInputHandler(event: { target: { name: any; value: string } }): void {
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
        break;
      case 'repeatPassword':
        setRepeatPassword(value);
        password !== value ? setMsg('비밀번호가 일치하지 않습니다') : setMsg('');
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
        id: id,
        nickname: name,
        password: password,
      })
      .then(response => {
        console.log('성공', response);
        navigate('/login');
      })
      .catch(error => {
        console.log('실패', error);
        alert('회원가입 실패');
      });
  }

  return (
    <div className="register__container">
      <div className="register__contents">
        <GoMain />
        <img className="register__logo" src={Logo} alt="plantit logo"></img>

        <form className="register-form">
          <div>
            <label htmlFor="id">
              <FontAwesomeIcon icon={faUserAlt} />
            </label>
            <input type="email" name="id" placeholder="아이디를 입력해주세요." value={id} onChange={onChangeInputHandler} required></input>
          </div>

          <div>
            <label htmlFor="name">
              <FontAwesomeIcon icon={faUserAlt} />
            </label>
            <input type="text" name="name" placeholder="닉네임을 입력해주세요." value={name} onChange={onChangeInputHandler} required></input>
          </div>

          <div>
            <label htmlFor="password">
              <FontAwesomeIcon icon={faKey} />
            </label>
            <input type="password" name="password" placeholder="비밀번호를 입력해주세요." value={password} onChange={onChangeInputHandler} required></input>
          </div>

          <div>
            <label htmlFor="repeatPassword">
              <FontAwesomeIcon icon={faKey} />
            </label>
            <input type="password" name="repeatPassword" placeholder="비밀번호를 한번 더 입력해주세요." value={repeatPassword} onChange={onChangeInputHandler} required></input>
          </div>

          <span>{msg}</span>

          <button type="submit" onClick={onClickSubmitHandler}>
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
export default RegisterPage;
