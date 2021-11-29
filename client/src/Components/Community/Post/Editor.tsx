//@ts-ignore
import ImageResize from '@looop/quill-image-resize-module-react';
import { useMemo, useRef, useCallback } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import QuillImageDropAndPaste from 'quill-image-drop-and-paste';
import 'react-quill/dist/quill.snow.css';
import { CommunityApi } from 'API/CommunityApi';

interface EditorProps {
  contents: string;
  onChange: (value: string) => void;
}

Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste);

export default function Editor({
  contents,
  onChange,
}: EditorProps): JSX.Element {
  const QuillRef = useRef<ReactQuill>(null);

  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    const formData = new FormData();
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    const quill = QuillRef.current?.getEditor();

    input.onchange = async () => {
      const file = input.files;
      if (file !== null) formData.append('image', file[0]);

      // Save current cursor state
      const range = quill?.getSelection()?.index;
      const res = await CommunityApi.Upload_Image.post('/blog/image', formData);
      const url = res.data;
      if (range !== undefined && range !== null) {
        let quill = QuillRef.current?.getEditor();
        quill?.setSelection(range, 1);

        quill?.clipboard.dangerouslyPasteHTML(
          range,
          `<img src=${url}  alt="이미지 태그 입니다." className="w-full"/>`,
        );
      }
      console.log(res.data);
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ size: ['small', false, 'large', 'huge'] }],
          ['bold', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
            { align: [] },
          ],
          ['image'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      imageDropAndPaste: true,
      clipboard: { matchVisual: false },
      imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize', 'Toolbar'],
      },
    }),
    [imageHandler],
  );

  const formats = [
    'size',
    'bold',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'align',
    'image',
  ];

  return (
    <ReactQuill
      className="Editor"
      ref={QuillRef}
      theme="snow"
      value={contents}
      onChange={onChange}
      modules={modules}
      formats={formats}
      placeholder={'내용을 입력해주세요.'}
    />
  );
}
