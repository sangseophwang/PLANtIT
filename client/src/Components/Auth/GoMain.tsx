import React from 'react';
import { useNavigate } from 'react-router-dom';
import './scss/GoMain.scss';

export default function GoMain(): JSX.Element {
  const navigate = useNavigate();
  return (
    <button
      className="GoMain"
      onClick={() => {
        navigate('/');
      }}
    >
      {'<'}메인화면
    </button>
  );
}
