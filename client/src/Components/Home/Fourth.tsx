import 'Components/Home/scss/Fourth.scss';
import Video from 'Assets/Home_Fourth.mp4';
import { Link } from 'react-router-dom';
export default function Fourth(): JSX.Element {
  return (
    <section className="Fourth__Container">
      <video className="Fourth__Video-Mobile" autoPlay muted loop playsInline>
        <source src={Video} type="video/mp4" />
      </video>
      <Link className="Fourth__Contents" to="/analysis">
        <h1>작물의 질병을 확인해보세요!</h1>
        <video autoPlay muted loop playsInline>
          <source src={Video} type="video/mp4" />
        </video>
      </Link>
    </section>
  );
}
