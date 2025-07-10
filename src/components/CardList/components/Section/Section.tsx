import { Component } from 'react';
import PageHeader from '../../../Templates/PageHeader/PageHeader';
import Card from '../Card/Card';
import type { DataProps } from '../../../../types/interfaces';

class Section extends Component<DataProps> {
  render() {
    const { data } = this.props;

    return (
      <section className="app__results">
        <PageHeader level={2} className="app__results-header">
          Result
        </PageHeader>

        <section className="app__results-output">
          <>
            {data?.map((item, index) => {
              return <Card key={index} item={item} />;
            })}
          </>
        </section>
      </section>
    );
  }
}

export default Section;
