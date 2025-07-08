import type { HtmlElementProps } from '../../../types/interfaces';

export default interface Button extends HtmlElementProps {
  type?: 'submit' | 'reset' | 'button';
}
