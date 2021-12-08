import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authApi } from 'API/AuthApi/index';
import Back from 'Components/Common/Back';
import Logo from 'Assets/logo.png';
import SignImage from 'Assets/Auth/login_side_image.jpeg';
import 'Components/Auth/scss/Register.scss';

function RegisterPage(): JSX.Element {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [msg, setMsg] = useState('');

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

    let isEmail: (boolean | JSX.Element)[] = authApi.validateEmail(id);
    let isPassword: (boolean | JSX.Element)[] =
      authApi.validatePassword(password);
    let isSamePassword: (boolean | JSX.Element)[] =
      authApi.validateSamePassword(password, repeatPassword);
    let isFilledForm: (boolean | JSX.Element)[] = authApi.validateFilledForm([
      id,
      name,
      password,
      repeatPassword,
    ]);

    if (isEmail[0] && isPassword[0] && isSamePassword[0] && isFilledForm[0]) {
      authApi.requestDjango
        .post('/user/register', {
          email: id,
          password1: password,
          password2: repeatPassword,
          nickname: name,
        })
        .then(response => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          response.data === 'Register Success'
            ? (navigate('/login'),
              toast.success('회원가입 성공!', {
                position: toast.POSITION.TOP_CENTER,
              }))
            : alert('fail register');
        })
        .catch(error => {
          let serverErrorMessage: string | JSX.Element = '';
          switch (error.response.data) {
            case 'Register Fail':
              serverErrorMessage = <div>회원가입 양식을 모두 적어주세요.</div>;
              break;
            case 'Invalid Email':
              serverErrorMessage = <div>잘못된 이메일 형식입니다.</div>;
              break;
            case 'Invalid Password':
              serverErrorMessage = authApi.passwordFormMessage;
              break;
            case 'Password Not Same':
              serverErrorMessage = (
                <div>비밀번호가 일치하는지 확인해주세요.</div>
              );
              break;
            case 'Already Exist':
              serverErrorMessage = <div>이미 등록된 이메일입니다.</div>;
              break;
          }
          toast.error(serverErrorMessage, {
            position: toast.POSITION.TOP_CENTER,
          });
        });
    } else {
      [isEmail, isPassword, isSamePassword, isFilledForm]
        .filter((value: (boolean | JSX.Element)[]) => {
          return value[0] === false;
        })
        // eslint-disable-next-line array-callback-return
        .map(falseValue => {
          toast.error(falseValue[1], {
            position: toast.POSITION.TOP_CENTER,
          });
          setId('');
          setName('');
          setPassword('');
          setRepeatPassword('');
        });
    }
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
