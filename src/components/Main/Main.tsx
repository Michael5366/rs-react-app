import { Component } from 'react';
import type { HtmlElementProps } from '../../types/interfaces';

class Main extends Component<HtmlElementProps> {
  render() {
    return <main className="app__search">{this.props.children}</main>;
  }
}

export default Main;
