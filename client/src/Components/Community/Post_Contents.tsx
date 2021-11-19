import QuillEditor from './QuillEditor';
import './scss/Post_Contents.scss';

export default function Post(): JSX.Element {
  return (
    <section className="Post__Container">
      <QuillEditor />
      <button>뒤로가기</button>
    </section>
  );
}
