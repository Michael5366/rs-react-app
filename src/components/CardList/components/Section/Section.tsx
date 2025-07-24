import PageHeader from '../../../Templates/PageHeader/PageHeader';
import type { DataProps } from '../../../../types/interfaces';
import RenderContent from './RenderContent';

const Section = ({ data, loading, error }: DataProps) => {
  return (
    <section className="app__results" data-testid="cardListSection">
      <PageHeader level={2} className="app__results-header">
        Result
      </PageHeader>

      <section className="app__results-output">
        <RenderContent data={data} loading={loading} error={error} />
      </section>
    </section>
  );
};

export default Section;
