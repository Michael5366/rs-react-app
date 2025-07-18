import { Component } from 'react';
import type { ThemeToggleProps } from './interface';

class ThemeToggle extends Component<ThemeToggleProps> {
  render() {
    const { onToggle, isDark } = this.props;

    return (
      <div className="app__theme-toggle" onClick={onToggle} role="button">
        <div
          className={`app__toggle-thumb ${isDark ? 'app__toggle-thumb--right' : ''}`}
        ></div>
      </div>
    );
  }
}

export default ThemeToggle;
