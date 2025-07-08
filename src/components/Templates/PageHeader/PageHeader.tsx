import { Component, type JSX } from 'react';

interface PageHeaderProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children?: React.ReactNode;
}

class PageHeader extends Component<PageHeaderProps> {
  render() {
    const { level, className, children } = this.props;
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;

    return <Tag className={className}>{children}</Tag>;
  }
}

export default PageHeader;
