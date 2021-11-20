//@ts-ignore
import ImageResize from '@looop/quill-image-resize-module-react';
import { useRef, useState, useMemo } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Editor(): JSX.Element {
  const QuillRef = useRef<ReactQuill>();
  const [contents, setContents] = useState('');
  Quill.register('modules/imageResize', ImageResize);
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { align: [] }],
          ['image'],
        ],
      },
      ImageResize: {
        modules: ['Resize'],
      },
    }),
    [],
  );
  return (
    <>
      <ReactQuill
        style={{ width: '80%', height: '55vh' }}
        ref={element => {
          if (element !== null) QuillRef.current = element;
        }}
        value={contents}
        onChange={setContents}
        modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
      />
    </>
  );
}
