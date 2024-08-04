import React from 'react';
import styles from './NotFoundPage.module.scss';
import { useNavigate } from 'react-router-dom';
import leftTrooper from '../../../public/assets/left-trooper.png';
import rightTrooper from '../../../public/assets/right-trooper.png';
import backArrow from '../../../public/assets/back-arrow.png';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles['not-found-container']}>
      <img
        className={styles['not-found-img-left']}
        src={leftTrooper.src}
        alt="trooper"
      />
      <div className={styles['not-found-content']}>
        <p className={styles['not-found-content-heading']}>Trooper report:</p>
        <p className={styles['not-found-content-text']}>
          This is not the page you are looking for. Move along.
        </p>
        <button className={styles['go-back-button']} onClick={handleGoBack}>
          <img
            src={backArrow.src}
            alt="Go back"
            className={styles['back-arrow']}
          />
          Go Back
        </button>
      </div>
      <img
        className={styles['not-found-img-right']}
        src={rightTrooper.src}
        alt="trooper"
      />
    </div>
  );
};

export default NotFoundPage;
