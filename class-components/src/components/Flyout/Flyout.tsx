import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clearItems } from '../../store/reducers/selectedItemsSlice';
import styles from './Flyout.module.scss';
import downloadIcon from '../../../public/assets/download.png';
import { Character } from '../../types/types';

const Flyout: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.selectedItems.selectedItems);
  const itemsCount = Object.keys(selectedItems).length;

  const handleUnselectAll = () => {
    dispatch(clearItems());
  };

  const convertToCSV = (items: Character[]): string => {
    const csvContent = [
      ['Name', 'Gender', 'Height', 'Eye Color', 'Homeworld', 'URL'],
      ...items.map(item => [item.name, item.gender, item.height, item.eye_color, item.homeworld, item.url])
    ].map(e => e.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    return URL.createObjectURL(blob);
  };

  if (itemsCount === 0) {
    return null;
  }

  return (
    <div className={styles.flyout}>
      <p className={styles['flyout-counter']}>{itemsCount} {itemsCount === 1 ? 'item' : 'items'} selected</p>
      <button className={styles['flyout-unselect-btn']} onClick={handleUnselectAll}>Unselect all</button>
      <a
        className={styles['flyout-download-btn']}
        href={convertToCSV(Object.values(selectedItems))}
        download={`starwars_${itemsCount}.csv`}
      >
        <img src={downloadIcon} alt="Download" className={styles['download-icon']} />
      </a>
    </div>
  );
};

export default Flyout;
