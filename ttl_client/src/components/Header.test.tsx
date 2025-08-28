import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Header from './Header';

describe('Header', () => {
  it('renders titles', () => {
    render(<Header />);
    expect(screen.getByText(/Invoeren/i)).toBeInTheDocument();
    expect(screen.getByText(/Opzoeken/i)).toBeInTheDocument();
  });
});
