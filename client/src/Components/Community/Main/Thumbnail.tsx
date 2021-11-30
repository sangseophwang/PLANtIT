import 'Components/Community/scss/Thumbnail.scss';

interface ThumbnailProps {
  onChangeOrder: Function;
}

export default function Thumbnail({
  onChangeOrder,
}: ThumbnailProps): JSX.Element {
  const handleOrder = (event: any) => {
    onChangeOrder(event, event.target.value);
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
    </section>
  );
}
