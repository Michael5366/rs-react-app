import type { ItemProps } from '../components/Card/interface';

const RightPanel = ({ item }: ItemProps) => {
  return (
    <div className="app__items">
      <h3 className="app__items-header">Item header</h3>
      <div className="app__item-name">{item.title}</div>
    </div>
  );
};

export default RightPanel;
