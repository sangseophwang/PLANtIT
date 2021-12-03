import 'Components/Home/scss/Second.scss';
import Video from 'Assets/Home_Second.mp4';
export default function Second(): JSX.Element {
  return (
    <section className="Second__Container">
      <span>
        Enjoy your PLAN IT life!<div>+</div>
      </span>
      <video autoPlay muted loop playsInline>
        <source src={Video} type="video/mp4" />
      </video>
    </section>
  );
}
