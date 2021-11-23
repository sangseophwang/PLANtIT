import './scss/test.scss';
import Footer from '../Common/Footer';
import CenterMap from '../Common/Map';
import Location from '../../Assets/Dummy/Location';

export default function Last(): JSX.Element {
  return (
    <section className="Test__Container">
      <CenterMap data={Location} />
      <Footer />
    </section>
  );
}
