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
  return (
    <Link to={address} className="Navigation__Item-Web">
      {name}
    </Link>
  );
}
