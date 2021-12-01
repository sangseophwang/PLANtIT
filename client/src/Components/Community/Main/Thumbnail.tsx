import { useNavigate } from 'react-router';
import 'Components/Community/scss/Thumbnail.scss';

interface ThumbnailProps {
  onChangeOrder: Function;
  data: any;
}

export default function Thumbnail({
  onChangeOrder,
  data,
}: ThumbnailProps): JSX.Element {
  const navigate = useNavigate();
  const handleOrder = (event: any) => {
    onChangeOrder(event.target.value);
  };
  return (
    <section className="Thumbnail__Container">
      <div className="Thumbnail__SelectButton__Wrapper">
        <select
          className="Thumbnail__SelectButton"
          name="게시 순서"
          onChange={handleOrder}
        >
          <option value="0">최신순</option>
          <option value="1">조회순</option>
        </select>
      </div>
      {data &&
        data.map(
          (post: {
            blog_id: number;
            thumbnail: string;
            title: string;
            author: string;
          }) => (
            <div
              className="Thumbnail__Post"
              key={post.blog_id}
              onClick={() => navigate(`/community/${post.blog_id}`)}
            >
              <img
                className="Thumbnail__Image"
                src={post.thumbnail}
                alt={`${post.blog_id} 썸네일`}
              />
              <div className="Thumbnail__Title-Wrapper">
                <h1 className="Thumbnail__Title">{post.title}</h1>
                <h3 className="Thumbnail__Subtitle">
                  <em>by </em> {post.author}
                </h3>
              </div>
            </div>
          ),
        )}
    </section>
  );
}
