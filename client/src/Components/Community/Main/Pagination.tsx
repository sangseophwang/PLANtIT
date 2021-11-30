import { useNavigate } from 'react-router';
import { CommunityApi } from 'API/CommunityApi';

export default function Pagination(): JSX.Element {
  const navigate = useNavigate();
  CommunityApi.Pagination.get('/blog').then(response => console.log(response));

  return (
    <>
      <h1>hello</h1>
    </>
  );
}
