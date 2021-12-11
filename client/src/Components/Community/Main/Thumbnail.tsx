import { useNavigate } from 'react-router';
import 'Components/Community/scss/Thumbnail.scss';

interface ThumbnailProps {
  onChangeOrder: Function;
  data: any;
  length: any;
}

export default function Thumbnail({
  onChangeOrder,
  data,
  length,
}: ThumbnailProps): JSX.Element {
  const navigate = useNavigate();
  const handleOrder = (event: any) => {
    onChangeOrder(event.target.value);
  };
  return (
    <section className="Thumbnail__Container">
      <div className="Thumbnail__SelectButton__Wrapper">
        <span>총 {length} 게시글</span>
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
              onClick={() => (
                // eslint-disable-next-line no-sequences
                window.scrollTo(0, 0),
                navigate(`/community/${post.blog_id}`, { state: post.blog_id })
              )}
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
