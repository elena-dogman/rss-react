import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, vi } from 'vitest';
import CloseButton from '../CloseButton';

describe('CloseButton Component', () => {
  it('should render the close button', () => {
    render(<CloseButton onClick={vi.fn()} />);

    const closeButton = screen.getByLabelText('Close');
    expect(closeButton).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const onClickMock = vi.fn();
    render(<CloseButton onClick={onClickMock} />);

    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);

    expect(onClickMock).toHaveBeenCalled();
  });
});
