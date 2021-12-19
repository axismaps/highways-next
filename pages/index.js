import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { SizeMe } from 'react-sizeme';
import { Grid, Box } from '@chakra-ui/react';

import Title from '../components/Title';
import Atlas from '../components/Atlas';
import Timeline from '../components/Timeline';
import Sidebar from '../components/Sidebar';
import Viewer from '../components/Viewer';
import config from '../config';

const { startYear } = config;

const Home = () => {
  const [year, setYear] = useState(startYear);
  const [activeBasemap, setActiveBasemap] = useState(null);
  const [highlightedLayer, setHighlightedLayer] = useState(null);
  const [activeThematic, setActiveThematic] = useState(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    setActiveBasemap(null);
  }, [year]);

  const responsiveHeight = ['calc(100vh - 149px)', 'calc(100vh - 125px)'];

  return (
    <Box>
      <Head>
        <title>Highways + Waterways</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script
          async
          defer
          data-website-id="9725066c-8cf4-46ce-b73c-0ea97a93b825"
          src="https://umami.axismaps.com/umami.js"
        />
      </Head>
      <Title title="Highways + Waterways" />
      <Timeline handler={setYear} />
      <Grid w="100%" h={responsiveHeight} templateColumns={['1fr', '320px 1fr']}>
        <Sidebar
          year={year}
          activeBasemap={activeBasemap}
          basemapHandler={setActiveBasemap}
          layerHandler={setHighlightedLayer}
          highlightedLayer={highlightedLayer}
          activeThematic={activeThematic}
          thematicHandler={setActiveThematic}
        />
        <SizeMe monitorHeight>
          {({ size }) => (
            <Box h={responsiveHeight} w={['100vw', 'calc(100vw - 320px)']}>
              <Atlas
                size={size}
                year={year}
                activeBasemap={activeBasemap}
                basemapHandler={setActiveBasemap}
                highlightedLayer={highlightedLayer}
                opacity={opacity}
                activeThematic={activeThematic}
              />
            </Box>
          )}
        </SizeMe>
      </Grid>
      {activeBasemap && (
        <Viewer
          year={year}
          activeBasemap={activeBasemap}
          basemapHandler={setActiveBasemap}
          opacityHandler={setOpacity}
        />
      )}
    </Box>
  );
};

export default Home;
