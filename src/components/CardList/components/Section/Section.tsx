import { Component } from 'react';
import PageHeader from '../../../Templates/PageHeader/PageHeader';
import Card from '../Card/Card';
import type { DataProps } from '../../../../types/interfaces';
import Spinner from '../../../Spinner/Spinner';
import ErrorMsg from '../../../Templates/ErrorMsg/ErrorMsg';

class Section extends Component<DataProps> {
  render() {
    const { data, loading, error } = this.props;

    return (
      <section className="app__results">
        <PageHeader level={2} className="app__results-header">
          Result
        </PageHeader>

        <section className="app__results-output">
          <>
            {error ? (
              <ErrorMsg errorMsg={error} />
            ) : loading ? (
              <Spinner />
            ) : data && data.length > 0 ? (
              data?.map((item, index) => {
                return <Card key={index} item={item} />;
              })
            ) : (
              <ErrorMsg errorMsg="Nothing matched your query" />
            )}
          </>
        </section>
      </section>
    );
  }
}

export default Section;
