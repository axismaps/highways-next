import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { Grid, Box, Heading } from '@chakra-ui/react';

import Atlas from '../components/Atlas';
import Timeline from '../components/Timeline';
import Sidebar from '../components/Sidebar';
import Viewer from '../components/Viewer';

const fetcher = year =>
  Promise.all([
    axios.get(`${process.env.NEXT_PUBLIC_SEARCH_API}/documents?year=${year}`),
    axios.get(`${process.env.NEXT_PUBLIC_SEARCH_API}/layers?year=${year}`),
  ]).then(res => ({
    documents: res[0].data,
    layers: res[1].data,
  }));

export default function Home() {
  const [year, setYear] = useState(1950);
  const [activeBasemap, setActiveBasemap] = useState(null);
  const [opacity, setOpacity] = useState(1);
  const [documents, setDocuments] = useState([]);
  const [layers, setLayers] = useState([]);

  const { data, error } = useSWR(year, fetcher);
  useEffect(() => {
    if (data && !error) {
      setDocuments(data.documents);
      setLayers(data.layers);
    }
  }, [data, error]);

  useEffect(() => {
    setActiveBasemap(null);
  }, [year]);

  return (
    <Box>
      <Heading fontSize={18} color="#002469" m={5} mb={0}>
        Highways + Waterways
      </Heading>
      <Timeline handler={setYear} />
      <Grid w="100%" h="calc(100vh - 125px)" templateColumns="320px 1fr">
        <Sidebar
          year={year}
          activeBasemap={activeBasemap}
          basemapHandler={setActiveBasemap}
          documents={documents}
          layers={layers}
        />
        <Atlas
          year={year}
          activeBasemap={activeBasemap}
          basemapHandler={setActiveBasemap}
          documents={documents}
          opacity={opacity}
        />
      </Grid>
      {activeBasemap && (
        <Viewer
          activeBasemap={activeBasemap}
          documents={documents}
          basemapHandler={setActiveBasemap}
          opacityHandler={setOpacity}
        />
      )}
    </Box>
  );
}
