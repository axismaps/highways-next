import React, { useState } from 'react';
import { Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';

import Atlas from '../components/Atlas';

export default function Home() {
  const [year, setYear] = useState(1950);
  return (
    <Box>
      <Box w="100%" h="800px">
        <Atlas year={year} />
      </Box>
      <Box>
        <Slider aria-label="slider-ex-1" value={year} min={1800} max={2020} onChange={setYear}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
    </Box>
  );
}
