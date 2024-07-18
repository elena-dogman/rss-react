import React from 'react';
import styles from './Loader.module.scss';
import loaderSvgUrl from '../../assets/loader.svg';

class Loader extends React.Component {
  render() {
    return (
      <div className={styles['loader-wrapper']}>
        <img
          src={loaderSvgUrl}
          alt="Loading..."
          className={styles['loader-image']}
        />
        <span className={styles['loader-text']}>Loading</span>
      </div>
    );
  }
}

export default Loader;
