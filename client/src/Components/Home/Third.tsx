import 'Components/Home/scss/Third.scss';
import Video from 'Assets/Home/Home_Third.mp4';
import { Link } from 'react-router-dom';

export default function Third(): JSX.Element {
  return (
    <section className="Third__Container">
      <video className="Third__Video-Mobile" autoPlay muted loop playsInline>
        <source src={Video} type="video/mp4" />
      </video>
      <Link className="Third__Contents" to="/analysis">
        <h1>작물의 질병을 확인해보세요!</h1>
        <video autoPlay muted loop playsInline>
          <source src={Video} type="video/mp4" />
        </video>
      </Link>
    </section>
  );
}
