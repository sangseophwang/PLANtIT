import 'Components/Home/scss/Second.scss';
import Video from 'Assets/Home_Second.mp4';
export default function Second(): JSX.Element {
  return (
    <section className="Second__Container">
      <h1>Enjoy your plant life!</h1>
      <video autoPlay muted loop playsInline>
        <source src={Video} type="video/mp4" />
      </video>
    </section>
  );
}
