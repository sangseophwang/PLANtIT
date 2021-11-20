//@ts-ignore
import ImageResize from '@looop/quill-image-resize-module-react';
import { useMemo, useState, useEffect, useRef } from 'react';
// @ts-ignore
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Editor(): JSX.Element {
  const QuillRef = useRef<ReactQuill>(null);
  const [contents, setContents] = useState('');
  const Block = Quill.import('blots/block');
  Block.tagName = 'SPAN';
  Quill.register(Block, true);
  Quill.register('modules/imageResize', ImageResize);
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [[{ header: [false] }], ['bold', 'underline', 'strike', 'blockquote'], [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }], ['image']],
      },

      imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize', 'Toolbar'],
      },
    }),
    [],
  );

  const formats = ['header', 'bold', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'align', 'image'];

  useEffect(() => {
    QuillRef.current?.getEditor().root.setAttribute('spellcheck', 'false');
  }, []);

  return <ReactQuill className="Editor" ref={QuillRef} theme="snow" value={contents} onChange={setContents} modules={modules} formats={formats} placeholder={'내용을 입력해주세요.'} />;
}
