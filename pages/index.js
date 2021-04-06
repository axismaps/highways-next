import React, { useState, useEffect } from 'react';
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
  const [year, setYear] = useState(startYear);
  const [activeBasemap, setActiveBasemap] = useState(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    setActiveBasemap(null);
  }, [year]);

  return (
    <Box>
      <Head>
        <title>Highways + Waterways</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Heading fontSize={18} color="#002469" m={5} mb={0}>
        Highways + Waterways
      </Heading>
      <Timeline handler={setYear} />
      <Grid
        w="100%"
        h={['calc(100vh - 160px)', 'calc(100vh - 125px)']}
        templateColumns={['1fr', '320px 1fr']}
      >
        <Sidebar year={year} activeBasemap={activeBasemap} basemapHandler={setActiveBasemap} />
        <SizeMe monitorHeight>
          {({ size }) => (
            <Box
              h={['calc(100vh - 160px)', 'calc(100vh - 125px)']}
              w={['100%', 'calc(100vw - 320px)']}
            >
              <Atlas
                size={size}
                year={year}
                activeBasemap={activeBasemap}
                basemapHandler={setActiveBasemap}
                opacity={opacity}
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
