import React, { useEffect } from 'react';
import { useFetchHomeworldQuery } from '../../store/reducers/apiSlice';
import Loader from '../Loader/Loader';

interface HomeworldFetcherProps {
  url: string;
  onFetch: (url: string, name: string) => void;
}

const HomeworldFetcher: React.FC<HomeworldFetcherProps> = ({ url, onFetch }) => {
  const { data, isLoading } = useFetchHomeworldQuery(url);

  useEffect(() => {
    if (data) {
      onFetch(url, data.name);
    }
  }, [data, onFetch, url]);

  return isLoading ? <Loader /> : null;
};

export default HomeworldFetcher;