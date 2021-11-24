// import React, { createContext, useState } from 'react';

// type Message = 'login success' | 'naver login success' | 'google login success';

// type State = {
//   message: Message;
//   token: string;
//   email: string;
//   nickname: string;
// };

// type ActionType = 'LOGIN_REQUEST' | 'LOGIN_SUCCESS' | 'LOGIN_FAILURE' | 'ADD_NICKNAME' | 'LOGOUT';

// type Action = { type: ActionType; payload: State };

// const createAction = (typeValue: ActionType, payloadValue: State): Action => {
//   return { type: typeValue, payload: payloadValue };
// };

// export function authReducer(state: State, action: Action): State {
//   switch (action.type) {
//     case 'LOGIN_SUCCESS':
//       return {
//         ...state,
//         user: action.payload,
//       };
//     case 'LOGOUT':
//       return {
//         ...state,
//         user: null,
//       };
//     default:
//       return state;
//   }
// }

// const AuthContext = createContext({
//   state: {
//     message: '',
//     token: '',
//     email: '',
//     nickname: '',
//   },
//   actions: {
//     setMessage: () => {},
//     setToken: () => {},
//     setEmail: () => {},
//     setNickname: () => {},
//   },
// });

// export const AuthContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
//   const [message, setMessage] = useState('');
//   const [token, setToken] = useState('');
//   const [email, setEmail] = useState('');
//   const [nickname, setNickname] = useState('');

//   const value = {
//     state: { message, token, email, nickname },
//     actions: { setMessage, setToken, setEmail, setNickname },
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
export {};
