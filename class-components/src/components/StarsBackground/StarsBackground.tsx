import React from 'react';
import styles from './StarsBackground.module.scss';

class StarsBackground extends React.Component {
  render() {
    return (
      <div className={styles.backgroundContainer}>
        <div id="stars" className={styles.stars}></div>
        <div id="stars2" className={styles.stars2}></div>
        <div id="stars3" className={styles.stars3}></div>
        <div className={styles.twinkling}></div>
      </div>
    );
  }
}

export default StarsBackground;
