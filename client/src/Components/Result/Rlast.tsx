import Footer from 'Components/Common/Footer';
import CenterMap from 'Components/Common/Map';
import Location from 'Assets/Dummy/Location';
import 'Components/Result/scss/Rlast.scss';

export default function Rlast(): JSX.Element {
  return (
    <section className="Last__Container">
      <CenterMap data={Location} />
      <Footer />
    </section>
  );
}
