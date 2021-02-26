import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';

import Atlas from '../components/Atlas';
import Timeline from '../components/Timeline';

export default function Home() {
  const [year, setYear] = useState(1950);
  return (
    <Box>
      <Timeline handler={setYear} />
      <Box w="100%" h="800px">
        <Atlas year={year} />
      </Box>
    </Box>
  );
}
