const React = require('react');
const { useState, useRef } = React;
const ReactDOM = require('react-dom');

const WordRelay = () => {
  const [word, setWord] = useState('지연이');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (word[word.length - 1] === value[0]) {
      setResult('딩동댕');
      setWord(value);
      setValue('');
      inputRef.current.focus();
    } else {
      setResult('땡');
      setValue('');
      inputRef.current.focus();
    }
  };

  onChangeInput = (e) => {
    setValue(e.target.value);
  };

  // control input과 uncontrol input
  // control input : value와 onChange 세트로 사용
  // uncontrol input : defaultValue를 써야함
  // 앱이 간단하면 언컨트롤드 인풋 쓰세요.

  // e.target.children.{inputID를 넣으세요} === value
  // value로 대체 가능
  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputRef}
          value={value}
          onChange={onChangeInput}
          type="text"
        />
        <button>입력</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = WordRelay;
