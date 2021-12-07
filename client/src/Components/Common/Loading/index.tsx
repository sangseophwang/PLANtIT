import React from 'react';
import 'Components/Common/scss/Loading.scss';
import { ClapSpinner } from 'react-spinners-kit';

export default function Loading(props: any): JSX.Element {
  return (
    <div className="Loading-Container">
      <ClapSpinner size={80} frontColor="#68d391" />
      {/* <div className="Loader" /> */}
      <div className="Loading-Text">{props.text}</div>
    </div>
  );
}
