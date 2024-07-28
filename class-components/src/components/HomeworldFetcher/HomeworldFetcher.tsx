import React, { useEffect } from 'react';
import { useFetchHomeworldQuery } from '../../store/reducers/apiSlice';
import { useLoading } from '../../contexts/useLoading';

interface HomeworldFetcherProps {
  url: string;
  onFetch: (url: string, name: string) => void;
}

const HomeworldFetcher: React.FC<HomeworldFetcherProps> = ({
  url,
  onFetch,
}) => {
  const { data, isLoading } = useFetchHomeworldQuery(url);
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  useEffect(() => {
    if (data) {
      onFetch(url, data.name);
    }
  }, [data, onFetch, url]);

  return null;
};

export default HomeworldFetcher;
