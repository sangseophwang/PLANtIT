import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import '../scss/Post.scss';
import Editor from './Editor';
import Submit from './Submit';

export default function Post(): JSX.Element {
  const navigate = useNavigate();
  const [id, setId] = useState<Number>(0);
  const [title, setTitle] = useState<String>('');
  console.log(title);
  return (
    <section className="Post__Container">
      <button className="Post__Back-Button" onClick={() => navigate('/community')}>
        {`< 뒤로가기`}
      </button>
      <div className="Post__Title-Box">
        <input className="Post__Title" type="text" placeholder="| 제목" onChange={event => setTitle(event.target.value)} />
      </div>
      <Editor />
      <Submit />
    </section>
  );
}
