const path = require('path'); // 경로 조작
const webpack = require('webpack');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// babel/core : 바벨을 기본적인 모듈
// babel/preset-env : 환경에 맞게 최신 문법을 옛날 문법으로 컴파일
// babel/react : jsx같은 리액트 문법을 컴파일 지원
// babel-loader : webpack과 babel을 연결시켜줌

module.exports = {
  name: 'word-realy-setting', // 어떤 것을 위한 설정인가?
  mode: 'development', // or production
  devtool: 'eval', // 빠르게 하겠다는 것, production에서는 hidden-source-map
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  // 가장 중요한 것 entry(입력), output(출력)
  entry: {
    // 아래 파일들을 하나로 합쳐줌. 다른 파일이 불러오는 파일은 따로 안적어도 됨. client.jsx 에서 이미 WordRelay.jsx를 불러고오 있어서 안써도됨
    app: ['./client'], // 확장자 안써도 됨, 여러가지 확장자가 있을 수 있음 => resolve.extensions에 있는 파일 확장자로 알아서 바꿔줌
  },

  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        // babel 옵션
        options: {
          // presets : 플러그인들의 모음. 하나의 preset에도 여러가지 기능이 있다. 하나의 preset도 설정을 따로 할 수 있다.
          presets: [
            [
              '@babel/preset-env',
              {
                // 브라우저 호환성을 위해 js코드 컴파일
                targets: {
                  browsers: ['> 5% in KR', 'last 2 chrome versions'], // 원하는 브라우저에만 맞춰서 변경 가능, 왜냐면 과거 브라우저로 갈수록 더 컴파일이 어려워져서 성능이 느려질 수 있다.
                  // '> 5% in KR' : 한국에서 5% 이상의 점유율을 차지하는 브라우저는 모두 지원
                  // https://github.com/browserslist/browserslist :: 여기서 확인 가능
                },
              },
            ],
            '@babel/preset-react',
          ],
          plugins: ['react-refresh/babel'],
          // react-refresh/babel :: 핫리로드 위해
        },
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: true }),
    new RefreshWebpackPlugin(), // 핫 리로드 위해
  ],

  output: {
    path: path.join(__dirname, 'dist'), // 경로를 알아서 합쳐줌. 현재 폴더 안에 있는 dist를 자동으로 절대 경로로 잡아줌
    filename: 'app.js',
  },
  devServer: {
    hot: true,
    port: 8080,
    open: true,
    // 아래 속성으로 서버 로컬호스트 404 에러 해결
    devMiddleware: { publicPath: '/dist/' },
    static: { directory: path.resolve(__dirname) }, // 실존하는 정적 파일 경로. 렌더링할 최상위 index.html 을 찾아야 함
    // path는 실제 경로,
    // publicPath는 가상경로
  },
};

// 명령어 webpack
