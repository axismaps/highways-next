import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { Box, Heading, Grid } from '@chakra-ui/react';

import styles from './Panel.module.css';

const Panel = ({ title, documents, basemapHandler, activeBasemap }) => (
  <Box mb={5}>
    <Heading size="md" mb={2}>
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
      boxShadow="md"
    >
      {documents.map(d => (
        <Box key={d.ssid} w="70px" h="70px" pos="relative" onClick={() => basemapHandler(d.ssid)}>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${d.ssid}/thumb.jpg`}
            className={activeBasemap === d.ssid ? styles.documentActive : styles.documentImage}
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
  activeBasemap: PropTypes.string,
};

Panel.defaultProps = {
  documents: [],
  activeBasemap: null,
};

export default Panel;
