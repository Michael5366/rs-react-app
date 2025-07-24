import type { ThemeToggleProps } from './interface';

const ThemeToggle = ({ onToggle, isDark }: ThemeToggleProps) => {
  return (
    <div
      className="app__theme-toggle"
      onClick={onToggle}
      role="button"
      aria-label="toggle theme"
    >
      <div
        className={`app__toggle-thumb ${isDark ? 'app__toggle-thumb--right' : ''}`}
      ></div>
    </div>
  );
};

export default ThemeToggle;
