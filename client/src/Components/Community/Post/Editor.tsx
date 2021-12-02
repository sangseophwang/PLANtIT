//@ts-ignore
import ImageResize from '@looop/quill-image-resize-module-react';
import { useMemo, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CommunityApi } from 'API/CommunityApi';

interface EditorProps {
  contents: string;
  onChange: (value: string) => void;
}

Quill.register('modules/imageResize', ImageResize);

export default function Editor({
  contents,
  onChange,
}: EditorProps): JSX.Element {
  const QuillRef = useRef<ReactQuill>();

  const imageHandler = () => {
    const input = document.createElement('input');
    const formData = new FormData();
    let url = '';

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files;
      if (file !== null) {
        formData.append('image', file[0]);

        try {
          const res = await CommunityApi.Post.post('/blog/image', formData);
          url = res.data;

          const range = QuillRef.current?.getEditor().getSelection()?.index;
          if (range !== null && range !== undefined) {
            let quill = QuillRef.current?.getEditor();

            quill?.setSelection(range, 1);

            quill?.clipboard.dangerouslyPasteHTML(
              range,
              `<img src=${url} alt="">`,
            );
          }
          return { ...res, success: true };
        } catch (error) {
          console.log(error);
        }
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ size: [false] }],
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
        handlers: { image: imageHandler },
      },
      clipboard: { matchVisual: false },
      imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize', 'Toolbar'],
      },
    }),
    [],
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
      ref={element => {
        if (element !== null) {
          QuillRef.current = element;
        }
      }}
      theme="snow"
      value={contents}
      onChange={onChange}
      modules={modules}
      formats={formats}
      placeholder={'내용을 입력해주세요.'}
    />
  );
}
