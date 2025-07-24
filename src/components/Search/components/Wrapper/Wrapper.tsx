import type { HtmlElementProps } from '../../../../types/interfaces';

const Wrapper = ({ children }: HtmlElementProps) => {
  return <div className="app__search">{children}</div>;
};

export default Wrapper;
