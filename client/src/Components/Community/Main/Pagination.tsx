import { useNavigate } from 'react-router';
import { CommunityApi } from 'API/CommunityApi';
import { useState, useEffect } from 'react';

export default function Pagination(): JSX.Element {
  const [length, setLength] = useState<number>();
  const navigate = useNavigate();
  useEffect(() => {
    async function getLength() {
      const response = await CommunityApi.Get_Page.get('/blog').then(response =>
        console.log(response),
      );
    }
  }, []);

  return (
    <>
      <h2>hello</h2>
    </>
  );
}
