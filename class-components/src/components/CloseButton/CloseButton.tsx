import React from 'react';
import styles from './CloseButton.module.scss';

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <div className={styles.close} onClick={onClick} role="button" aria-label="Close">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <svg viewBox="0 0 36 36" className={styles.circle}>
        <path
          strokeDasharray="100, 100"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
    </div>
  );
};

export default CloseButton;
