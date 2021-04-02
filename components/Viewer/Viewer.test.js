import React from 'react';
import axios from 'axios';
import renderer from 'react-test-renderer';
import MockAdapter from 'axios-mock-adapter';
import { render, screen } from '../../test/test-utils';

import Viewer from './index';
import document from '../../__mocks__/document.data';
import documents from '../../__mocks__/documents.data';

describe('Viewer', () => {
  it('Renders the viewer image', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(`${process.env.NEXT_PUBLIC_SEARCH_API}/documents?year=1950`).reply(200, documents);
    mock.onGet(`${process.env.NEXT_PUBLIC_SEARCH_API}/document/SSID25009564`).reply(200, document);

    render(
      <Viewer
        activeBasemap="SSID25009564"
        basemapHandler={() => {}}
        opacityHandler={() => {}}
        year={1950}
      />
    );
    await screen.findAllByText(text => text.match(/^Sanborn/));
    expect(screen.getAllByText('Sanborn Map Houston 1950 Vol 15 Key 02')[0]).toBeInTheDocument();
  });

  it('matches snapshot', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet(`${process.env.NEXT_PUBLIC_SEARCH_API}/document/SSID25009564`).reply(200, document);
    mock.onGet(`${process.env.NEXT_PUBLIC_SEARCH_API}/documents?year=1950`).reply(200, documents);

    render(
      <Viewer
        activeBasemap="SSID25009564"
        basemapHandler={() => {}}
        opacityHandler={() => {}}
        year={1950}
      />
    );
    await screen.findAllByText(text => text.match(/^Sanborn/));

    const tree = renderer
      .create(
        <Viewer
          activeBasemap="SSID25009564"
          basemapHandler={() => {}}
          opacityHandler={() => {}}
          year={1950}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
