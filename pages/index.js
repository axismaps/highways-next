import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { Grid, Box, Heading } from '@chakra-ui/react';

import Atlas from '../components/Atlas';
import Timeline from '../components/Timeline';
import Sidebar from '../components/Sidebar';

const fetcher = year =>
  axios.get(`${process.env.NEXT_PUBLIC_SEARCH_API}/documents?year=${year}`).then(res => res.data);

export default function Home() {
  const [year, setYear] = useState(1950);
  const [basemap, setBasemap] = useState(null);
  const [documents, setDocuments] = useState([]);

  const { data, error } = useSWR(year, fetcher);
  useEffect(() => {
    if (data && !error) setDocuments(data);
  }, [data, error]);

  return (
    <Box>
      <Heading fontSize={18} color="#002469" m={5} mb={0}>
        Highways + Waterways
      </Heading>
      <Timeline handler={setYear} />
      <Grid w="100%" h="calc(100vh - 125px)" templateColumns="320px 1fr">
        <Sidebar
          year={year}
          activeBasemap={basemap}
          basemapHandler={setBasemap}
          documents={documents}
        />
        <Atlas
          year={year}
          activeBasemap={basemap}
          basemapHandler={setBasemap}
          documents={documents}
        />
      </Grid>
    </Box>
  );
}
