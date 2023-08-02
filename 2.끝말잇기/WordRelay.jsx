const React = require('react');
const { Component } = React;
const ReactDOM = require('react-dom');

class WordRelay extends Component {
  state = {
    word: '지연',
    value: '',
    result: '',
  };

  onSubmitForm = (e) => {
    e.preventDefault();

    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState({
        result: '딩동댕',
        value: '',
        word: this.state.value,
      });
      this.input.focus();
    } else {
      this.setState({
        result: '땡',
        value: '',
        word: this.state.word,
      });
      this.input.focus();
    }
  };

  onChangeInput = (e) => {
    this.setState({ value: e.target.value });
  };

  input;

  onRefInput = (c) => {
    this.input = c;
  };

  // control input과 uncontrol input
  // control input : value와 onChange 세트로 사용
  // uncontrol input : defaultValue를 써야함
  render() {
    return (
      <>
        <div>{this.state.word}</div>
        <form onSubmit={this.onSubmitForm}>
          <input
            ref={this.onRefInput}
            value={this.state.value}
            onChange={this.onChangeInput}
            type="text"
          />
          <button>입력</button>
        </form>
        <div>{this.state.result}</div>
      </>
    );
  }
}

module.exports = WordRelay;
