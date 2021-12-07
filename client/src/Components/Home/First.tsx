import 'Components/Home/scss/First.scss';
import Video from 'Assets/Home/Home_First.mp4';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faFacebook, faInstagram);

export default function First(): JSX.Element {
  return (
    <header className="First__Container">
      <span>
        Enjoy your PLAN IT life!<div>+</div>
      </span>
      <video autoPlay muted loop playsInline>
        <source src={Video} type="video/mp4" />
      </video>
      <div className="First__SNS">
        <FontAwesomeIcon
          icon={faFacebook}
          onClick={() =>
            window.open(
              'https://www.facebook.com/%ED%94%8C%EB%9E%98%EB%8B%9B-103380602183948',
            )
          }
        />
        <FontAwesomeIcon
          icon={faInstagram}
          onClick={() =>
            window.open('https://www.instagram.com/team_plant_it/')
          }
        />
      </div>
    </header>
  );
}
