import Footer from 'Components/Common/Footer';
import CenterMap from 'Components/Common/Map';
import Location from 'Variables/Location';
import 'Components/Result/scss/Rlast.scss';

export default function Rlast(): JSX.Element {
  return (
    <section className="Last__Container">
      <div className="Last__Content">주변의 치료시설을 찾아보세요!</div>
      <CenterMap data={Location} />
      <Footer data={'relative'} />
    </section>
  );
}
