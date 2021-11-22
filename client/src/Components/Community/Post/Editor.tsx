//@ts-ignore
import ImageResize from '@looop/quill-image-resize-module-react';
import { useMemo, useState, useEffect, useRef } from 'react';
// @ts-ignore
import ReactQuill, { Quill } from 'react-quill';
import QuillImageDropAndPaste from 'quill-image-drop-and-paste';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

export default function Editor(): JSX.Element {
  Quill.register('modules/imageResize', ImageResize);
  Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste);
  const QuillRef = useRef<ReactQuill>(null);
  const [contents, setContents] = useState('');
  /*
  const [stringedFile, setStringedFile] = useState('');

  console.log(stringedFile.length);

  const imageHandler = () => {
    // 파일을 업로드 하기 위한 input 태그 생성
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    // 파일이 input 태그에 담기면 실행 될 함수
    input.onchange = async () => {
      const file = input.files;
      if (file !== null) {
        fileToUrl(file[0]);
      }
    };
  };

  const fileToUrl = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      if (e.target?.result) {
        setStringedFile(e.target.result);
      }
    };
  };
*/
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [[{ header: [false] }], ['bold', 'underline', 'strike', 'blockquote'], [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }], ['image']],
        // handlers: {
        //   image: imageHandler,
        // },
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
