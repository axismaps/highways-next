import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';

import Timeline from './index';

describe('Timeline', () => {
  it('Renders the timeline', async () => {
    render(<Timeline handler={() => {}} />);
    expect(screen.getByText('1900')).toBeInTheDocument();
  });

  it('matches snapshot', async () => {
    const tree = renderer.create(<Timeline handler={() => {}} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
