import "./scss/First.scss";
import Logo from "../../Assets/logo.png";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faFacebook, faInstagram);

export default function First(): JSX.Element {
  return (
    <header className="First__Container">
      <div className="First__Wrapper">
        <img className="First__Logo-Mobile" src={Logo} alt="로고" />
        <span>안녕하세요.</span>
        <span>우리는 플래닛입니다.</span>
        <div className="First__SNS">
          <FontAwesomeIcon
            icon={faFacebook}
            onClick={() => window.open("https://www.facebook.com")}
          />
          <FontAwesomeIcon
            icon={faInstagram}
            onClick={() => window.open("https://www.instagram.com")}
          />
        </div>
      </div>
    </header>
  );
}
