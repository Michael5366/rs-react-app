import { Component } from 'react';
import type { HtmlElementProps } from '../../../types/interfaces';

class ButtonTemplate extends Component<HtmlElementProps> {
  render() {
    return (
      <button className={this.props.className}>{this.props.children}</button>
    );
  }
}

export default ButtonTemplate;
