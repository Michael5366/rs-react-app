import { Component } from 'react';
import ButtonTemplate from '../Templates/ButtonTemplate/ButtonTemplate';
import BrokenComponent from './BrokenComponent';

class ErrorButton extends Component {
  state: { throwError: boolean } = {
    throwError: false,
  };

  handleError = () => {
    this.setState({ throwError: true });
  };

  render() {
    return this.state.throwError ? (
      <BrokenComponent />
    ) : (
      <ButtonTemplate className="app__error-btn" onClick={this.handleError}>
        Error button
      </ButtonTemplate>
    );
  }
}

export default ErrorButton;
