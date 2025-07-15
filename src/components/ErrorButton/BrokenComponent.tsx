import { Component } from 'react';

class BrokenComponent extends Component {
  render() {
    throw new Error('Oops from BrokenComponent');
    return null;
  }
}

export default BrokenComponent;
