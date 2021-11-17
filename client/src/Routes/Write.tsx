import { useRef, useState, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Write(): JSX.Element {
  const QuillRef = useRef<ReactQuill>();
  const [contents, setContents] = useState('');

  // Upload Image
  const imageHandler = () => {
    const input = document.createElement('input');
    const formData = new FormData();
    let url = '';

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    // 파일이 input 태그에 담기면 실행될 함수
    input.onchange = async () => {
      const file = input.files;
      if (file !== null) formData.append('image', file[0]);

      const range = QuillRef.current?.getEditor().getSelection()?.index;
      if (range !== null && range !== undefined) {
        let quill = QuillRef.current?.getEditor();
        quill?.clipboard.dangerouslyPasteHTML(range, `<img src=${url} alt="" />`);
      }
    };
  };
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { align: [] }],
          ['image', 'video'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  );

  return (
    <>
      <header className="Write__Header">
        <h1>글 작성</h1>
      </header>
      <ReactQuill
        ref={element => {
          if (element !== null) {
            QuillRef.current = element;
          }
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
