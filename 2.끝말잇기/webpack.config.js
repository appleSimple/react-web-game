const path = require('path'); // 경로 조작

module.exrpots = {
  name: 'word-realy-setting', // 어떤 것을 위한 설정인가?
  mode: 'development', // or production
  devtool: 'eval', // 빠르게 하겠다는 것
  resolve: {
    extensions: ['.js', '.jsx']
  },

  // 가장 중요한 것 entry(입력), output(출력)
  entry: {
    // 아래 파일들을 하나로 합쳐줌. 다른 파일이 불러오는 파일은 따로 안적어도 됨. client.jsx 에서 이미 WordRelay.jsx를 불러고오 있어서 안써도됨
    app: ['./client'], // 확장자 안써도 됨, 여러가지 확장자가 있을 수 있음 => resolve.extensions에 있는 파일 확장자로 알아서 바꿔줌
  },

  output: {
    path: path.join(__dirname, 'dist'), // 경로를 알아서 합쳐줌. 현재 폴더 안에 있는 dist를 자동으로 절대 경로로 잡아줌
    filename: 'app.js'
  }
};

// 명령어 webpack