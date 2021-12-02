import { useState, useEffect } from 'react';
import { MainApi } from 'API/MainApi';
import 'Components/Home/scss/Fifth.scss';
import { useNavigate } from 'react-router';

export default function Fifth(): JSX.Element {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const getThumbnail = async () => {
    const response = await MainApi.Get_Thumbnail.get('/blog/main');
    setData(response.data);
  };
  useEffect(() => {
    getThumbnail();
  }, []);

  //
  const ThumbnailItem = (props: any) => {
    return (
      <div
        className="Fifth__Article"
        onClick={() =>
          navigate(`/community/${props.data.blog_id}`, {
            state: props.data.blog_id,
          })
        }
      >
        <img src={props.data.thumbnail} alt="썸네일 이미지" />
        <h1>{props.data.title}</h1>
        <span>
          <em>by </em> {props.data.author}
        </span>
      </div>
    );
  };

  return (
    <section className="Fifth__Container">
      <div className="Fifth__Wrapper">
        <h1 className="Fifth__Title">여러분의 지식을 공유해보세요 →</h1>
        <div className="Fifth__Contents">
          <div className="Fifth__Section">
            {data &&
              data.map(post => (
                <ThumbnailItem key={Math.random()} data={post} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
