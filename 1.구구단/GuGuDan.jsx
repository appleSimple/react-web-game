const React = require('react');
const { useState, useRef } = React;

const GuGuDan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (parseInt(value) === first * second) {
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue('');
      setResult(() => {
        return `${value} 정답`;
      });
      inputRef.current.focus();
      console.log(inputRef);
    } else {
      setValue('');
      setResult('땡');
      inputRef.current.focus();
    }
  };

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div>
        {first}곱하기 {second}은?
      </div>
      <form onSubmit={(e) => onSubmitForm(e)}>
        <input
          ref={inputRef}
          type="number"
          value={value}
          onChange={(e) => onChangeInput(e)}
        />
        <button>입력</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = GuGuDan;
