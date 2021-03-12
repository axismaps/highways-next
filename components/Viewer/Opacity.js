import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Text, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';

const Opacity = ({ opacityHandler }) => (
  <Flex>
    <Text fontSize={12} fontWeight="bold" mr={5}>
      Opacity:
    </Text>
    <Slider
      aria-label="slider-ex-1"
      defaultValue={1}
      max={1}
      min={0}
      step={0.1}
      onChange={opacityHandler}
      colorScheme="gray"
      mr={2}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  </Flex>
);

Opacity.propTypes = {
  opacityHandler: PropTypes.func.isRequired,
};

export default Opacity;
