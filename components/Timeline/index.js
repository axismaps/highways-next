import React from 'react';
import PropTypes from 'prop-types';
import { range } from 'lodash';
import {
  Flex,
  Box,
  Heading,
  Text,
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

const Timeline = ({ handler, year }) => {
  const TimelineButton = ({ icon, newYear }) => (
    <IconButton icon={icon} mx={5} borderRadius="50%" onClick={() => handler(newYear)} />
  );

  TimelineButton.propTypes = {
    icon: PropTypes.element.isRequired,
    newYear: PropTypes.number.isRequired,
  };

  return (
    <Flex
      py={[2, 5]}
      pr={5}
      pl={[5, 0]}
      boxShadow="0 2px 2px rgba(0,0,0,0.25)"
      pos="relative"
      zIndex={2}
      display={['block', 'flex']}
    >
      <Flex justifyContent="center">
        <TimelineButton
          icon={<ArrowLeftIcon />}
          newYear={Math.max(minYear, Math.round((year - 5) / 5) * 5)}
        />
        <Heading w="100px" textAlign="center">
          {year}
        </Heading>
        <TimelineButton
          icon={<ArrowRightIcon />}
          newYear={Math.min(maxYear, Math.round((year + 5) / 5) * 5)}
        />
      </Flex>
      <Slider
        colorScheme="gray"
        aria-label="slider-ex-1"
        value={year}
        min={minYear}
        max={maxYear}
        onChange={handler}
        h="40px"
        mt={[2, 0]}
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
                h="27px"
                lineHeight="27px"
                mt="-2px"
                pl={1}
                userSelect="none"
                fontSize="0.7em"
              >
                <Text display={['none', 'block']}>{y}</Text>
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
  year: PropTypes.number.isRequired,
};

export default Timeline;
