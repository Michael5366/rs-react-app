import { type ChangeEvent } from 'react';
import type FieldProps from './interface';

const Field = ({ value, onChange }: FieldProps) => {
  return (
    <input
      className="app__search-field"
      placeholder="Search"
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>): void => {
        onChange?.(e.target.value);
      }}
    />
  );
};

export default Field;
