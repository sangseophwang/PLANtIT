import './scss/Fifth.scss';
import TestImage from '../../Assets/test.jpeg';
import { Link } from 'react-router-dom';

export default function Fifth(): JSX.Element {
  return (
    <section className="Fifth__Container">
      <div className="Fifth__Wrapper">
        <h1 className="Fifth__Title">여러분의 지식을 공유해보세요 →</h1>
        <div className="Fifth__Contents">
          <div className="Fifth__Section">
            <Link className="Fifth__Article" to="/community">
              <img src={TestImage} alt="" />
              <h1>토마토는 이렇게 먹는다.</h1>
              <span>by 야매요리사</span>
            </Link>
            <Link className="Fifth__Article" to="/community">
              <img src={TestImage} alt="" />
              <h1>토마토는 이렇게 먹는다.</h1>
              <span>by 야매요리사</span>
            </Link>
          </div>
          <div className="Fifth__Section">
            <Link className="Fifth__Article" to="/community">
              <img src={TestImage} alt="" />
              <h1>토마토는 이렇게 먹는다.</h1>
              <span>by 야매요리사</span>
            </Link>
            <Link className="Fifth__Article" to="/community">
              <img src={TestImage} alt="" />
              <h1>토마토는 이렇게 먹는다.</h1>
              <span>by 야매요리사</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
