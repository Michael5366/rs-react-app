import { type JSX } from 'react';
import type { PageHeaderProps } from './interface';

const PageHeader = ({ level, className, children }: PageHeaderProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return <Tag className={className}>{children}</Tag>;
};

export default PageHeader;
