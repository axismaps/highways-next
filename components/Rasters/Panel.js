import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { Box, Button, Grid, Heading } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

import styles from './Panel.module.css';

const Panel = ({ title, documents, basemapHandler, activeBasemap }) => {
  const [expanded, setExpanded] = useState(false);
  return (
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
        {documents.map((d, i) => (
          <Box
            key={[d.ssid, i].join()}
            w="70px"
            h="70px"
            pos="relative"
            onClick={() => basemapHandler(d.ssid)}
            display={expanded || i < 9 ? 'auto' : 'none'}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${d.ssid}/thumb.jpg`}
              className={activeBasemap === d.ssid ? styles.documentActive : styles.documentImage}
              layout="fill"
              objectFit="cover"
            />
          </Box>
        ))}
        {documents.length > 9 && (
          <Button
            variant="ghost"
            size="xs"
            gridColumn="1/4"
            leftIcon={<FontAwesomeIcon icon={expanded ? faCaretUp : faCaretDown} />}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Show less' : `Show ${documents.length - 9} more`}
          </Button>
        )}
      </Grid>
    </Box>
  );
};

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  documents: PropTypes.arrayOf(PropTypes.shape({})),
  basemapHandler: PropTypes.func.isRequired,
  activeBasemap: PropTypes.string,
};

Panel.defaultProps = {
  documents: [],
  activeBasemap: null,
};

export default Panel;
