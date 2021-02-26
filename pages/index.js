import React, { useState } from 'react';
import { Box, Heading } from '@chakra-ui/react';

import Atlas from '../components/Atlas';
import Timeline from '../components/Timeline';

export default function Home() {
  const [year, setYear] = useState(1950);
  return (
    <Box>
      <Heading fontSize={18} color="#002469" m={5} mb={0}>
        Highways + Waterways
      </Heading>
      <Timeline handler={setYear} />
      <Box w="100%" h="calc(100vh - 125px)">
        <Atlas year={year} />
      </Box>
    </Box>
  );
}
