import { Component } from 'react';
import type ErrorMsgProps from './interface';

class ErrorMsg extends Component<ErrorMsgProps> {
  render() {
    const { errorMsg } = this.props;

    return (
      <div className="app__error">
        <p className="app__error-text">{errorMsg}</p>
      </div>
    );
  }
}

export default ErrorMsg;
