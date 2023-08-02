const React = require('react');
const ReactDOM = require('react-dom');
const WordRelay = require('./WordRelay');

// js와 jsx의 차이점
// jsx는 리액트 전용 파일이라는 것을 알 수 있음

ReactDOM.render(<WordRelay />, document.querySelector('#root'));