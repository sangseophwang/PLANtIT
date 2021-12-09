import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { CommunityApi } from 'API/CommunityApi';
import { useLocation } from 'react-router';
import { Helmet } from 'react-helmet-async';
import Editor from 'Components/Community/Post/Editor';
import Submit from 'Components/Community/Post/Submit';
import 'Components/Community/scss/Post.scss';

export default function Post(): JSX.Element {
  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');
  const navigate = useNavigate();
  const location: any = useLocation();

  // 수정됐을 때 제목과 글 업데이트
  useEffect(() => {
    if (location.state) {
      setTitle(location.state[0].title);
      setContents(location.state[0].content);
    }
  }, [location]);

  // 게시글 등록
  const onSubmitHandler = () => {
    // 제목을 작성하지 않았을 때
    if (!title) {
      toast.error('제목을 입력해주세요.', {
        autoClose: 2500,
      });
      // 글을 작성하지 않았을 때
    } else if (!contents) {
      toast.error('글을 작성해주세요.', {
        autoClose: 2500,
      });
    } else {
      // 일반적인 글 등록
      if (!location.state) {
        try {
          CommunityApi.Community_Post('blog/post', {
            title: title,
            content: contents,
          }).then(response => {
            if (response.data.new_token !== null) {
              localStorage.removeItem('access_token');
              localStorage.setItem('access_token', response.data.new_token);
              navigate('/community');
            } else {
              navigate('/community');
            }
          });
        } catch (error) {}

        //수정할 때 글 등록
      } else {
        try {
          CommunityApi.Modify_Post(`blog/update/${location.state[1]}`, {
            title: title,
            content: contents,
          }).then(response => {
            if (response.data.new_token !== null) {
              localStorage.removeItem('access_token');
              localStorage.setItem('access_token', response.data.new_token);
              navigate('/community');
            } else {
              navigate('/community');
            }
          });
        } catch (error) {}
      }
    }
  };

  return (
    <section className="Post__Container">
      <Helmet>
        <title>글 작성</title>
      </Helmet>
      <div className="Post__Title-Box">
        <input
          className="Post__Title"
          type="text"
          placeholder="+ 제목"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
      </div>
      <Editor onChange={value => setContents(value)} contents={contents} />
      <Submit onSubmitHandler={onSubmitHandler} />
    </section>
  );
}
