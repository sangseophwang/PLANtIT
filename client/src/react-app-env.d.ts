/// <reference types="react-scripts" />
declare module '*.mp4' {
  const src: string;
  export default src;
}

declare global {
  interface Window {
    Kakao: any;
  }
  export default kakao;
}
