import { Component } from 'react';
import PageHeader from '../../../Templates/PageHeader/PageHeader';
import Card from '../Card/Card';

class Section extends Component {
  render() {
    return (
      <section className="app__results">
        <PageHeader level={2} className="app__results-header">
          Result
        </PageHeader>

        <section className="app__results-output">
          <Card />
        </section>
      </section>
    );
  }
}

export default Section;
