import { FC, ReactNode, useState } from 'react';
import { SearchContext, SearchContextProps } from './SearchContext';

interface TestSearchProviderProps {
  value: Partial<SearchContextProps>;
  children: ReactNode;
}

const TestSearchProvider: FC<TestSearchProviderProps> = ({
  value,
  children,
}) => {
  const [searchTerm, setSearchTerm] = useState(value.searchTerm || '');

  const contextValue: SearchContextProps = {
    searchTerm,
    setSearchTerm: value.setSearchTerm || setSearchTerm,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export default TestSearchProvider;
