import React, { ReactNode } from 'react';
import { DetailContext, DetailContextProps } from './DetailContext';

interface DetailProviderMockProps {
  children: ReactNode;
  value: DetailContextProps;
}

export const DetailProviderMock: React.FC<DetailProviderMockProps> = ({ children, value }) => {
  return <DetailContext.Provider value={value}>{children}</DetailContext.Provider>;
};
