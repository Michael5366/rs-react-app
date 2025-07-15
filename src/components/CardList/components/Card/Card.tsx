import { Component } from 'react';
import type { ItemProps } from './interface';

class Card extends Component<ItemProps> {
  render() {
    const { title, opening_crawl } = this.props.item;

    return (
      <div className="app__output">
        <div className="app__result">
          <div className="app__items">
            <h3 className="app__items-header">Item header</h3>
            <div className="app__item-name">{title}</div>
          </div>
          <div className="app__descriptions">
            <h3 className="app__descriptions-header">Description header</h3>
            <div className="app__description">{opening_crawl}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
