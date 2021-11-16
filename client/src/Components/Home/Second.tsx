import './scss/Second.scss';
import Video from '../../Assets/video.mp4';
export default function Second(): JSX.Element {
  return (
    <section className="Second__Container">
      <h1>Feel your plant life!</h1>
      <video autoPlay muted loop playsInline>
        <source src={Video} type="video/mp4" />
      </video>
    </section>
  );
}
