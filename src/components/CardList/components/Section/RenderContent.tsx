import { Component } from 'react';
import type { DataProps } from '../../../../types/interfaces';
import ErrorMsg from '../../../Templates/ErrorMsg/ErrorMsg';
import Spinner from '../../../Spinner/Spinner';
import Card from '../Card/Card';

class RenderContent extends Component<DataProps> {
  render() {
    const { data, loading, error } = this.props;

    return (
      <>
        {error && <ErrorMsg errorMsg={error} />}
        {!error && loading && <Spinner />}
        {!error &&
          !loading &&
          data &&
          data?.length > 0 &&
          data.map((item) => <Card key={item.title} item={item} />)}
        {!error && !loading && (!data || data.length === 0) && (
          <ErrorMsg errorMsg="Nothing matched your query" />
        )}
      </>
    );
  }
}

export default RenderContent;
