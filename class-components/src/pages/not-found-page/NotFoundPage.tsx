import React from 'react';
import styles from './NotFoundPage.module.scss';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles['not-found-container']}>
      <img
        className={styles['not-found-img-left']}
        src="/assets/left-trooper.png"
        alt="trooper"
      />
      <div className={styles['not-found-content']}>
        <p className={styles['not-found-content-heading']}>Trooper report:</p>
        <p className={styles['not-found-content-text']}>
          This is not the page you are looking for. Move along.
        </p>
        <button className={styles['go-back-button']} onClick={handleGoBack}>
          <img
            src="/assets/back-arrow.png"
            alt="Go back"
            className={styles['back-arrow']}
          />
          Go Back
        </button>
      </div>
      <img
        className={styles['not-found-img-right']}
        src="/assets/right-trooper.png"
        alt="trooper"
      />
    </div>
  );
};

export default NotFoundPage;
