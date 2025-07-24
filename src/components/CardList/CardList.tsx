import Section from './components/Section/Section';
import { type DataProps } from '../../types/interfaces';

const CardList = ({ data, loading, error }: DataProps) => {
  return <Section data={data} loading={loading} error={error} />;
};

export default CardList;
