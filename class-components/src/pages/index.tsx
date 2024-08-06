import React from 'react';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import MainPageWithProvider from '../components/main-page/MainPage';
import { fetchCharacters } from '../api/characters';
import { Character } from '../types/types';

type PageProps = {
  initialData: {
    characters: Character[];
    totalPages: number;
  };
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (context) => {
  const { term = '', page = '1' } = context.query;

  try {
    const data = await fetchCharacters(term as string, parseInt(page as string, 10));
    return {
      props: { initialData: data },
    };
  } catch (error) {
    console.error('Error fetching characters:', error);
    return {
      props: { initialData: { characters: [], totalPages: 0 } },
    };
  }
};

const HomePage: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ initialData }) => {
  return <MainPageWithProvider initialData={initialData} />;
};

export default HomePage;
