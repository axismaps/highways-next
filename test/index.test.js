import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../pages/index';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: 'Highways + Waterways' })).toBeInTheDocument();
  });
});
