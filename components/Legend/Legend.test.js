import React from 'react';
import axios from 'axios';
import renderer from 'react-test-renderer';
import MockAdapter from 'axios-mock-adapter';
import { render, screen } from '../../test/test-utils';

import Legend from './index';
import layers from '../../__mocks__/layers.data';

describe('Legend', () => {
  const mock = new MockAdapter(axios);
  mock.onGet(`${process.env.NEXT_PUBLIC_SEARCH_API}/layers?year=1950`).reply(200, layers);

  it('renders for 1950 without crashing', async () => {
    render(<Legend year={1950} />);
    await screen.findByText('Legend');
    expect(screen.getByRole('heading', { name: 'Legend' })).toBeInTheDocument();
    expect(screen.getByText('Roads')).toBeInTheDocument();
  });

  it('matches snapshot', async () => {
    render(<Legend year={1950} />);
    await screen.findByText('Legend');

    const tree = renderer.create(<Legend year={1950} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
