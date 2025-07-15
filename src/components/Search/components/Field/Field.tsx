import { Component, type ChangeEvent } from 'react';
import type FieldProps from './interface';

class Field extends Component<FieldProps> {
  render() {
    return (
      <input
        className="app__search-field"
        placeholder="Search"
        value={this.props.value}
        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
          this.props.onChange?.(e.target.value);
        }}
      />
    );
  }
}

export default Field;
