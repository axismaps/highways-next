import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Heading } from '@chakra-ui/react';

const Legend = ({ title, scale, colors }) => (
  <Box>
    <Heading as="h3" size="sm" mt={6} mb={2}>
      {title}
    </Heading>
    <Grid templateColumns={`repeat(${colors.length}, 1fr)`}>
      {colors.map((color, i) => (
        <Box key={color} bg={color} h="1rem">
          <Box
            fontSize={12}
            float="right"
            pos="relative"
            top="15px"
            left="15px"
            w="30px"
            textAlign="center"
          >
            {`${scale[i] || ''}`}
          </Box>
        </Box>
      ))}
    </Grid>
  </Box>
);

Legend.propTypes = {
  title: PropTypes.string.isRequired,
  scale: PropTypes.arrayOf(PropTypes.number).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Legend;
