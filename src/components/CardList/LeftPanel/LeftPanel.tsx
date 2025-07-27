import type { ItemProps } from '../components/Card/interface';

const LeftPanel = ({ item }: ItemProps) => {
  return (
    <div className="app__descriptions">
      <h3 className="app__descriptions-header">Description header</h3>
      <div className="app__description">{item.description}</div>
    </div>
  );
};

export default LeftPanel;
