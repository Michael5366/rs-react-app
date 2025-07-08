import { Component } from 'react';
import type Button from './interface';

class ButtonTemplate extends Component<Button> {
  render() {
    return (
      <button className={this.props.className} type={this.props.type}>
        {this.props.children}
      </button>
    );
  }
}

export default ButtonTemplate;
