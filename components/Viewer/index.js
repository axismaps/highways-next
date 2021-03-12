import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { Box, Flex, Spacer, Heading, Text, Button } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '@chakra-ui/icons';

import Opacity from './Opacity';

const Viewer = ({ documents, activeBasemap, opacityHandler, basemapHandler }) => {
  const type = documents.find(d => d.Documents.find(v => v.ssid === activeBasemap));
  const currentIndex = type.Documents.findIndex(t => t.ssid === activeBasemap);
  const document = type.Documents[currentIndex];

  const changeView = step => {
    let nextIndex = currentIndex + step;
    if (nextIndex >= type.Documents.length) nextIndex = 0;
    else if (nextIndex < 0) nextIndex = type.Documents.length - 1;
    basemapHandler(type.Documents[nextIndex].ssid);
  };

  return (
    <Box
      pos="absolute"
      right="10px"
      top="120px"
      w="330px"
      p="20px"
      gridTemplateRows="1fr 1fr 1fr 40px"
      rowGap="20px"
      backgroundColor="white"
    >
      <Flex mb={2}>
        <Heading size="sm">{document.title}</Heading>
        <Spacer />
        <CloseIcon onClick={() => basemapHandler(null)} fontSize={12} mt={1} cursor="pointer" />
      </Flex>
      <Box pos="relative" h="180px" mb={2}>
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${document.ssid}/medium.jpg`}
          layout="fill"
          objectFit="cover"
        />
      </Box>
      <Text mb={2}>
        Vivamus tempus ante a interdum pulvinar. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Integer.
      </Text>
      {type.title.match(/view/gi) ? (
        <Flex>
          <Button leftIcon={<ChevronLeftIcon />} w="40%" onClick={() => changeView(-1)}>
            Prev
          </Button>
          <Spacer />
          <Button rightIcon={<ChevronRightIcon />} w="40%" onClick={() => changeView(1)}>
            Next
          </Button>
        </Flex>
      ) : (
        <Opacity opacityHandler={opacityHandler} />
      )}
    </Box>
  );
};

Viewer.propTypes = {
  documents: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  activeBasemap: PropTypes.string.isRequired,
  opacityHandler: PropTypes.func.isRequired,
  basemapHandler: PropTypes.func.isRequired,
};

export default Viewer;
