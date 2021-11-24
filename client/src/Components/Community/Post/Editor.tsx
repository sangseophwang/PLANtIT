//@ts-ignore
import ImageResize from '@looop/quill-image-resize-module-react';
import { useMemo, useEffect, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import QuillImageDropAndPaste from 'quill-image-drop-and-paste';
import 'react-quill/dist/quill.snow.css';

interface EditorProps {
  contents: string;
  onChange: (value: string) => void;
}

Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste);

export default function Editor({ contents, onChange }: EditorProps): JSX.Element {
  const QuillRef = useRef<ReactQuill>(null);

  // const imageHandler = useCallback(() => {
  //   const input = document.createElement('input');

  //   input.setAttribute('type', 'file');
  //   input.setAttribute('accept', 'image/*');
  //   input.click();

  //   let quill = QuillRef.current.getEditor();

  //   input.onchange = async () => {
  //     const file = input.files[0];
  //     const formData = new FormData();

  //     formData.append('image', file);

  //     const range = quill.getSelection();

  //   }

  // }, [])

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ size: ['small', false, 'large', 'huge'] }],
          ['bold', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }, { align: [] }],
          ['image'],
        ],
        // handlers: {
        //   image: imageHandler,
        // },
      },
      imageDropAndPaste: true,
      clipboard: { matchVisual: false },
      imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize', 'Toolbar'],
      },
    }),
    [],
  );

  const formats = ['size', 'bold', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'align', 'image'];

  useEffect(() => {
    QuillRef.current?.getEditor().root.setAttribute('spellcheck', 'false');
  }, []);

  return <ReactQuill className="Editor" ref={QuillRef} theme="snow" value={contents} onChange={onChange} modules={modules} formats={formats} placeholder={'내용을 입력해주세요.'} />;
}
