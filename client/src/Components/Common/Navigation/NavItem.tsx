import { Link } from 'react-router-dom';
import 'Components/Common/scss/Navigation.scss';

interface NavProps {
  data: {
    name: string;
    address: string;
  };
}

export default function NavItem({ data }: NavProps): JSX.Element {
  const { name, address } = data;

  const scrollToServiceSection = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Link
      to={address}
      className="Navigation__Item-Web"
      onClick={scrollToServiceSection}
    >
      {name}
    </Link>
  );
}
