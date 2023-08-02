const React = require('react');
const { Component } = React;
const ReactDOM = require('react-dom');

class WordRelay extends Component {
  state = {
    text: 'Hello, Webpack'
  };

  render() {
    return <h1>{this.state.text}</h1>
  }
}

module.exports = WordRelay;

