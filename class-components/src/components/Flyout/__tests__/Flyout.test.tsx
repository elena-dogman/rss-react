import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, vi, beforeEach, afterEach } from 'vitest';
import Flyout from '../Flyout';
import { Provider } from 'react-redux';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { clearItems } from '../../../store/reducers/selectedItemsSlice';
import { Character } from '../../../types/types';

interface PartialRootState {
  selectedItems: {
    selectedItems: { [key: string]: Character };
  };
}

const mockStore = configureMockStore<PartialRootState>();

const selectedItems: { [key: string]: Character } = {
  '1': { name: 'Luke Skywalker', gender: 'male', height: '172', eye_color: 'blue', homeworld: 'Tatooine', url: '1' },
  '2': { name: 'Leia Organa', gender: 'female', height: '150', eye_color: 'brown', homeworld: 'Alderaan', url: '2' }
};

describe('Flyout Component', () => {
  let store: MockStoreEnhanced<PartialRootState>;
  let originalCreateObjectURL: typeof URL.createObjectURL;

  beforeEach(() => {
    store = mockStore({
      selectedItems: {
        selectedItems
      }
    });

    store.dispatch = vi.fn();

    originalCreateObjectURL = URL.createObjectURL;
    URL.createObjectURL = vi.fn().mockReturnValue('mocked-url');
  });

  afterEach(() => {
    URL.createObjectURL = originalCreateObjectURL;
  });

  it('renders the correct number of selected items', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByText('2 items selected')).toBeInTheDocument();
  });

  it('calls dispatch to clear items when "Unselect all" button is clicked', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    fireEvent.click(screen.getByText('Unselect all'));

    expect(store.dispatch).toHaveBeenCalledWith(clearItems());
  });

  it('renders download link with correct URL', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const downloadLink = screen.getByRole('link', { name: /download/i });
    expect(downloadLink).toHaveAttribute('href', 'mocked-url');
    expect(downloadLink).toHaveAttribute('download', 'starwars_2.csv');
  });
});
