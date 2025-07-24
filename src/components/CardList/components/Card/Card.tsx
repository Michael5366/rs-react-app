import type { ItemProps } from './interface';

const Card = ({ item }: ItemProps) => {
  return (
    <div className="app__output">
      <div className="app__result">
        <div className="app__items">
          <h3 className="app__items-header">Item header</h3>
          <div className="app__item-name">{item.title}</div>
        </div>
        <div className="app__descriptions">
          <h3 className="app__descriptions-header">Description header</h3>
          <div className="app__description">{item.opening_crawl}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
