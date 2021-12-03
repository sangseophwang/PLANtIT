import { useState, useEffect } from 'react';
import 'Components/Common/scss/ProgressBar.scss';

export default function ProgressBar(): JSX.Element {
  const [scroll, setScroll] = useState<number>(0);

  useEffect(() => {
    let progressBarHandler = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const length = Number(`${totalScroll / windowHeight}`);
      setScroll(length);
    };
    window.addEventListener('scroll', progressBarHandler);
    return () => window.removeEventListener('scroll', progressBarHandler);
  }, []);

  return (
    <div className="ProgressBar__Container">
      <div
        className="ProgressBar__Status"
        style={{ width: scroll * 100 + '%' }}
      ></div>
    </div>
  );
}
