import React from 'react';
import styles from './Loader.module.scss';
import loaderSvgUrl from '../../../public/assets/loader.svg';

const Loader: React.FC = () => {
  return (
    <div className={styles['loader-wrapper']}>
      <img
        src={loaderSvgUrl.src}
        alt="Loading..."
        className={styles['loader-image']}
      />
      <span className={styles['loader-text']}>Loading</span>
    </div>
  );
};

export default Loader;
