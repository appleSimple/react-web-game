import React from 'react';
import { createRoot } from 'react-dom/client';
import TikTackTo from './TikTakTo';

// js와 jsx의 차이점
// jsx는 리액트 전용 파일이라는 것을 알 수 있음
createRoot(document.querySelector('#root')).render(<TikTackTo />);
