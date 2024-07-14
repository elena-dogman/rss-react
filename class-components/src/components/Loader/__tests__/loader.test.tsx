import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import Loader from '../Loader';

describe('Loader Component', () => {
  it('should render loader image and text', () => {
    render(<Loader />);

    const loaderImage = screen.getByAltText('Loading...');
    const loaderText = screen.getByText('Loading');

    expect(loaderImage).toBeInTheDocument();
    expect(loaderText).toBeInTheDocument();
  });
});
