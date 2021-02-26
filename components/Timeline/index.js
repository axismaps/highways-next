import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { range } from 'lodash';
import {
  Flex,
  Box,
  Heading,
  IconButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

import config from '../../config';

const { minYear, maxYear } = config;
const roundedMinYear = Math.ceil(minYear / 10) * 10;
const roundedMaxYear = Math.floor(maxYear / 10) * 10;
const yearRange = range(roundedMinYear, roundedMaxYear, 10);

const Timeline = ({ handler }) => {
  const [year, setYear] = useState(1900);
  useEffect(() => {
    handler(year);
  }, [year]);
  return (
    <Flex py={5} pr={5} boxShadow="0 2px 2px rgba(0,0,0,0.25)" pos="relative" zIndex={2}>
      <Flex>
        <IconButton
          icon={<ArrowLeftIcon />}
          mx={5}
          borderRadius="50%"
          onClick={() => setYear(Math.max(minYear, Math.round((year - 5) / 5) * 5))}
        />
        <Heading>{year}</Heading>
        <IconButton
          icon={<ArrowRightIcon />}
          mx={5}
          borderRadius="50%"
          onClick={() => setYear(Math.min(maxYear, Math.round((year + 5) / 5) * 5))}
        />
      </Flex>
      <Slider
        colorScheme="gray"
        aria-label="slider-ex-1"
        value={year}
        min={minYear}
        max={maxYear}
        onChange={setYear}
        h="40px"
      >
        <Flex
          pos="relative"
          top="-12px"
          zIndex={1}
          w="100%"
          pl={`${((roundedMinYear - minYear) / (maxYear - minYear)) * 100}%`}
          pr={`${((maxYear - roundedMaxYear) / (maxYear - minYear)) * 100}%`}
        >
          {yearRange.map(y => (
            <React.Fragment key={y}>
              <Box
                borderLeft="1px solid black"
                boxSizing="border-box"
                w={`${100 / (yearRange.length - 1)}%`}
                pl={1}
                userSelect="none"
              >
                {y}
              </Box>
            </React.Fragment>
          ))}
        </Flex>
        <SliderTrack h="30px">
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb h="100%" w="16px" />
      </Slider>
    </Flex>
  );
};

Timeline.propTypes = {
  handler: PropTypes.func.isRequired,
};

export default Timeline;
