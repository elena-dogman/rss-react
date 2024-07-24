import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { clearItems } from '../../store/reducers/selectedItemsSlice';
import { saveAs } from 'file-saver';
import styles from './Flyout.module.scss';
import downloadIcon from '../../../public/assets/download.png';

const Flyout: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.selectedItems.selectedItems);
  const itemsCount = Object.keys(selectedItems).length;

  const handleUnselectAll = () => {
    dispatch(clearItems());
  };

  const handleDownload = () => {
    const itemsArray = Object.values(selectedItems);
    const csvContent = `data:text/csv;charset=utf-8,${[
      ['Name', 'Gender', 'Height', 'Eye Color', 'Homeworld', 'URL'],
      ...itemsArray.map(item => [item.name, item.gender, item.height, item.eye_color, item.homeworld, item.url])
    ].map(e => e.join(',')).join('\n')}`;

    const blob = new Blob([decodeURIComponent(encodeURI(csvContent))], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${itemsCount}_items.csv`);
  };

  if (itemsCount === 0) {
    return null;
  }

  return (
    <div className={styles.flyout}>
      <p className={styles['flyout-counter']}>{itemsCount} {itemsCount === 1 ? 'item' : 'items'} selected</p>
      <button className={styles['flyout-unselect-btn']} onClick={handleUnselectAll}>Unselect all</button>
      <button className={styles['flyout-download-btn']} onClick={handleDownload}>
        <img src={downloadIcon} alt="Download" className={styles['download-icon']} />
      </button>
    </div>
  );
};

export default Flyout;
