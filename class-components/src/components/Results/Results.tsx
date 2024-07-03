import React from 'react';
import styles from './Results.module.scss';

class Results extends React.Component {
  render() {
    return <div className={styles.results}>
      <img src="src\assets\r2d2.png" className={styles["character-image"]}></img>
      <div className={styles["character-info"]}>
        <p className={styles["character-name"]}></p>
      </div>
    </div>;
  }
}

export default Results;
