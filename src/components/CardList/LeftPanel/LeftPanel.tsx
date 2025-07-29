import { Link, useLocation } from 'react-router-dom';
import type { LeftPanelProps } from '../../../types/interfaces';

const LeftPanel = ({ item }: LeftPanelProps) => {
  const location = useLocation();

  return (
    <div className="app__items">
      <h3 className="app__items-header">Episode</h3>
      <Link
        to={`/details/${item.id}${location.search}`}
        className="app__item-name"
      >
        {item.title}
      </Link>
    </div>
  );
};

export default LeftPanel;
