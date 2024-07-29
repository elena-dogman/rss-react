import { useContext } from 'react';
import { DetailContext } from './DetailContext';

const useDetail = () => {
  const context = useContext(DetailContext);
  if (!context) {
    throw new Error('useDetail must be used within a DetailProvider');
  }
  return context;
};

export default useDetail;
