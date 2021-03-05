import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { Box, Heading, Grid } from '@chakra-ui/react';

const Panel = ({ title, documents, basemapHandler }) => (
  <Box>
    <Heading size="md" mb="10px">
      {title}
    </Heading>
    <Grid
      templateColumns="repeat(3, 70px)"
      columnGap="15px"
      rowGap="15px"
      px="15px"
      py="10px"
      backgroundColor="white"
      borderRadius="5px"
    >
      {documents.map(d => (
        <Box
          key={d.ssid}
          w="70px"
          h="70px"
          pos="relative"
          borderRadius="5px"
          onClick={() => basemapHandler(d.ssid)}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${d.ssid}/thumb.jpg`}
            layout="fill"
            objectFit="cover"
          />
        </Box>
      ))}
    </Grid>
  </Box>
);

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  documents: PropTypes.arrayOf(PropTypes.shape()),
  basemapHandler: PropTypes.func.isRequired,
};

Panel.defaultProps = {
  documents: [],
};

export default Panel;
