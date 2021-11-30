import { useNavigate } from 'react-router';
import { CommunityApi } from 'API/CommunityApi';
import { useState, useEffect } from 'react';

export default function Pagination(): JSX.Element {
  const [length, setLength] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function getLength() {
      let response = await CommunityApi.Get_Page.get('/blog');
      setLength(response.data);
    }
    getLength();
  }, []);
  console.log(length);
  return (
    <>
      <button onClick={() => navigate('/community/1')}>hello</button>
    </>
  );
}
