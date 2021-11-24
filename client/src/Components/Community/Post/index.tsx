import { useState } from 'react';
import 'Components/Community/scss/Post.scss';
import Editor from 'Components/Community/Post/Editor';
import Submit from 'Components/Community/Post/Submit';

export default function Post(): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');
  console.log(title);
  console.log(contents);
  return (
    <section className="Post__Container">
      <div className="Post__Title-Box">
        <input className="Post__Title" type="text" placeholder="+ 제목" onChange={event => setTitle(event.target.value)} />
      </div>
      <Editor onChange={value => setContents(value)} contents={contents} />
      <Submit />
    </section>
  );
}
