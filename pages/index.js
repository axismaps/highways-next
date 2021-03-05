import React, { useState } from 'react';
import { Grid, Box, Heading } from '@chakra-ui/react';

import Atlas from '../components/Atlas';
import Timeline from '../components/Timeline';
import Sidebar from '../components/Sidebar';

export default function Home() {
  const [year, setYear] = useState(1950);
  const [basemap, setBasemap] = useState(null);

  return (
    <Box>
      <Heading fontSize={18} color="#002469" m={5} mb={0}>
        Highways + Waterways
      </Heading>
      <Timeline handler={setYear} />
      <Grid w="100%" h="calc(100vh - 125px)" templateColumns="320px 1fr">
        <Sidebar year={year} basemapHandler={setBasemap} />
        <Atlas year={year} activeBasemap={basemap} />
      </Grid>
    </Box>
  );
}
