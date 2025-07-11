import { Component } from 'react';
import Section from './components/Section/Section';
import { type DataProps } from '../../types/interfaces';

class CardList extends Component<DataProps> {
  render() {
    return (
      <Section
        data={this.props.data}
        loading={this.props.loading}
        error={this.props.error}
      />
    );
  }
}

export default CardList;
