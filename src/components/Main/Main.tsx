import type { HtmlElementProps } from '../../types/interfaces';

const Main = ({ children }: HtmlElementProps) => {
  return <main className="app__main">{children}</main>;
};

export default Main;
