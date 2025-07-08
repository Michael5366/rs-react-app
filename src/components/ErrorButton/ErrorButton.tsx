import { Component } from 'react';
import ButtonTemplate from '../Templates/ButtonTemplate/ButtonTemplate';

class ErrorButton extends Component {
  render() {
    return (
      <ButtonTemplate className="app__error-btn">Error button</ButtonTemplate>
    );
  }
}

export default ErrorButton;
