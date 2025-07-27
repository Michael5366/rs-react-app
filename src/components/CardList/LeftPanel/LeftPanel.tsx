import { Link } from 'react-router-dom';
import type { ItemProps } from '../components/Card/interface';

const LeftPanel = ({ item }: ItemProps) => {
  return (
    <div className="app__items">
      <h3 className="app__items-header">Episode</h3>
      <Link to={`?details=${item.id}`} className="app__item-name">
        {item.title}
      </Link>
    </div>
  );
};

export default LeftPanel;
