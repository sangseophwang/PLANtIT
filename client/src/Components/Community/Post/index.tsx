import { useState } from 'react';
import { toast } from 'react-toastify';
import 'Components/Community/scss/Post.scss';
import Editor from 'Components/Community/Post/Editor';
import Submit from 'Components/Community/Post/Submit';
import { useNavigate } from 'react-router';
import { CommunityApi } from 'API/CommunityApi';

export default function Post(): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');
  const navigate = useNavigate();
  console.log(contents);
  const onSubmitHandler = () => {
    if (!title) {
      toast.error('제목을 입력해주세요.');
    } else if (!contents) {
      toast.error('글을 작성해주세요.');
    } else {
      try {
        CommunityApi.Community_Post.post('/blog/post', {
          title: title,
          content: contents,
        }).then(response => {
          navigate('/community');
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <section className="Post__Container">
      <div className="Post__Title-Box">
        <input
          className="Post__Title"
          type="text"
          placeholder="+ 제목"
          onChange={event => setTitle(event.target.value)}
        />
      </div>
      <Editor onChange={value => setContents(value)} contents={contents} />
      <Submit onSubmitHandler={onSubmitHandler} />
    </section>
  );
}
