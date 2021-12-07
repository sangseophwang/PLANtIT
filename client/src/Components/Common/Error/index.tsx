import React from 'react';
import 'Components/Common/scss/Error.scss';

export default function Error(props: any): JSX.Element {
  return <div className="Error__Container">{props.text}</div>;
}
