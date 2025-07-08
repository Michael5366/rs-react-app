import { Component, type JSX } from 'react';
import type { PageHeaderProps } from './interface';

class PageHeader extends Component<PageHeaderProps> {
  render() {
    const { level, className, children } = this.props;
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;

    return <Tag className={className}>{children}</Tag>;
  }
}

export default PageHeader;
