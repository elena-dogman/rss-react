import { vi } from 'vitest';

vi.mock('*.css', () => ({}));
vi.mock('*.scss', () => ({}));

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
  writable: true,
});
