import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import styles from './ThemeSelector.module.scss';

const ThemeSelector: React.FC = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('ThemeContext must be used within a ThemeProvider');
  }

  const { theme, setTheme } = context;

  const handleToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={styles.theme_f}>
      <label className={styles.f}>
        <span className={styles.rebels}>Rebels</span>
        <input
          className={styles.f__input}
          type="checkbox"
          name="faction"
          value="empire"
          checked={theme === 'dark'}
          onChange={handleToggle}
        />
        <span className={styles.f__switch}>
          <span className={styles.f__handle}>
            <span className={styles.f__1}></span>
            <span className={styles.f__2}>
              <span className={styles.f__2a}></span>
              <span className={styles.f__2b}></span>
              <span className={styles.f__2c}></span>
              <span className={styles.f__2d}></span>
              <span className={styles.f__2e}></span>
            </span>
            <span className={styles.f__3}></span>
            <span className={styles.f__4}></span>
            <span className={styles.f__5}></span>
            <span className={styles.f__6}></span>
            <span className={styles.f__7}></span>
            <span className={styles.f__8}></span>
            <span className={styles.f__9}></span>
            <span className={styles.f__10}></span>
            <span className={styles.f__11}></span>
            <span className={styles.f__12}></span>
            <span className={styles.f__13}></span>
            <span className={styles.f__14}></span>
            <span className={styles.f__15}></span>
            <span className={styles.f__16}></span>
            <span className={styles.f__17}></span>
          </span>
        </span>
        <span className={styles.empire}>Empire</span>
      </label>
    </div>
  );
};
export default ThemeSelector;
