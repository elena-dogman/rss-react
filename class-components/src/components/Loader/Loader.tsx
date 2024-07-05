import React from 'react';
import styles from './Loader.module.scss';
import loaderSvgUrl from '../../assets/loader.svg';

const Loader: React.FC = () => {
  return (
    <div className={styles['loader-wrapper']}>
      <object
        data={loaderSvgUrl}
        type="image/svg+xml"
        className={styles['loader-image']}
      />
      <span className={styles['loader-text']}>Loading</span>
    </div>
  );
};

export default Loader;
