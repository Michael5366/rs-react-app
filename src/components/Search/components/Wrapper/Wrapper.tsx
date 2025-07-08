import { Component } from 'react';
import type { HtmlElementProps } from '../../../../types/interfaces';

class Wrapper extends Component<HtmlElementProps> {
  render() {
    return <div className="app__search">{this.props.children}</div>;
  }
}

export default Wrapper;
