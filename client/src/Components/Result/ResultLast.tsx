import CenterMap from 'Components/Common/Map';
import Location from 'Variables/Location';
import 'Components/Result/scss/ResultLast.scss';

export default function ResultLast(): JSX.Element {
  return (
    <section className="ResultLast__Container">
      <div className="ResultLast__Content">
        주변의 치료시설을 찾아보세요 🏥
        <div className="ResultLast__Notice">위치 엑세스를 허용해 주세요</div>
      </div>
      <CenterMap data={Location} />
    </section>
  );
}
