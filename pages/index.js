import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { SizeMe } from 'react-sizeme';
import { Grid, Box, Heading } from '@chakra-ui/react';

import Atlas from '../components/Atlas';
import Timeline from '../components/Timeline';
import Sidebar from '../components/Sidebar';
import Viewer from '../components/Viewer';
import config from '../config';

const { startYear } = config;

const Home = () => {
  const { query } = useRouter();
  const [year, setYear] = useState(startYear);
  const [activeBasemap, setActiveBasemap] = useState(null);
  const [highlightedLayer, setHighlightedLayer] = useState(null);
  const [activeThematic, setActiveThematic] = useState(null);
  const [activeAnimation, setActiveAnimation] = useState(null);
  const [activeAnimationFrame, setActiveAnimationFrame] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    setActiveBasemap(null);
  }, [year]);

  useEffect(() => {
    if (query.year && !Number.isNaN(query.year)) {
      setYear(Number(query.year));
    }
  }, [query.year]);

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
      <Heading fontSize={18} color="#002469" m={[2, 5]} mb={[0, 0]} textAlign={['center', 'left']}>
        Highways + Waterways
      </Heading>
      <Timeline year={year} handler={setYear} />
      <Grid w="100%" h={responsiveHeight} templateColumns={['1fr', '320px 1fr']}>
        <Sidebar
          year={year}
          activeBasemap={activeBasemap}
          basemapHandler={setActiveBasemap}
          layerHandler={setHighlightedLayer}
          highlightedLayer={highlightedLayer}
          activeThematic={activeThematic}
          thematicHandler={setActiveThematic}
          activeAnimation={activeAnimation}
          animationHandler={setActiveAnimation}
          animationFrame={activeAnimationFrame}
          animationFrameHandler={setActiveAnimationFrame}
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
                activeAnimation={activeAnimation}
                animationFrame={activeAnimationFrame}
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
