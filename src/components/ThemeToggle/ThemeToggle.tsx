import { Component } from 'react';
import type { ThemeToggleState } from './interface';

class ThemeToggle extends Component<object, ThemeToggleState> {
  state: { isRight: boolean } = {
    isRight: false,
  };

  themeToggle = (): void => {
    this.setState((prev) => ({ isRight: !prev.isRight }));
    document.documentElement.classList.toggle('dark-theme');
  };

  render() {
    const { isRight } = this.state;

    return (
      <div className="app__theme-toggle" onClick={this.themeToggle}>
        <div
          className={`app__toggle-thumb ${isRight ? 'app__toggle-thumb--right' : ''}`}
        ></div>
      </div>
    );
  }
}

export default ThemeToggle;
