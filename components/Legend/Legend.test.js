import React from 'react';
import axios from 'axios';
import { render, screen } from '../../test/test-utils';

import Legend from './index';

describe('Legend', () => {
  it('renders for 1950 without crashing', async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_SEARCH_API}/layers?year=1950`);
    render(<Legend year={1950} />);
    await screen.findByText('Legend');

    expect(screen.getByRole('heading', { name: 'Legend' })).toBeInTheDocument();
    expect(screen.getByText('Roads')).toBeInTheDocument();
  });
});
