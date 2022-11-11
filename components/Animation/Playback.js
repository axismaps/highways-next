import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Heading,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react';

const Legend = ({ title, frames, isActive, animationFrame, animationFrameHandler }) => (
  <Box pr={2}>
    <Heading as="h3" size="sm" mt={6} mb={2}>
      {title}
    </Heading>
    <Slider
      aria-label={`${title} Slider`}
      min={0}
      max={frames.length - 1}
      value={isActive ? animationFrame : 0}
      onChange={animationFrameHandler}
      isDisabled={!isActive}
    >
      {frames.map((frame, index) => (
        <SliderMark
          key={frame.label}
          value={index}
          fontSize="sm"
          ml={-2.5}
          mt={2}
          userSelect="none"
        >
          {frame.label}
        </SliderMark>
      ))}
      <SliderTrack h={2}>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  </Box>
);

Legend.propTypes = {
  title: PropTypes.string.isRequired,
  frames: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, directory: PropTypes.string })
  ).isRequired,
  isActive: PropTypes.bool.isRequired,
  animationFrame: PropTypes.number.isRequired,
  animationFrameHandler: PropTypes.func.isRequired,
};

export default Legend;
