import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Spacer, Heading, Text, Button, Image } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '@chakra-ui/icons';

import Opacity from './Opacity';
import Lightbox from './Lightbox';

const Viewer = ({ documents, activeBasemap, opacityHandler, basemapHandler }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

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
      right={[0, '10px']}
      top={['auto', '120px']}
      bottom={[0, 'auto']}
      w={['100%', '330px']}
      p="20px"
      gridTemplateRows="1fr 1fr 1fr 40px"
      rowGap="20px"
      backgroundColor="white"
      zIndex={8}
    >
      <Flex mb={2}>
        <Heading size="sm" fontSize={[14, 'auto']}>
          {document.title}
        </Heading>
        <Spacer />
        <CloseIcon onClick={() => basemapHandler(null)} fontSize={12} mt={1} cursor="pointer" />
      </Flex>
      <Box display={['flex', 'block']} mb={[2, 0]}>
        <Box pos="relative" mb={2} maxWidth={['25%', 'auto']}>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${document.ssid}/medium.jpg`}
            onClick={() => setLightboxOpen(true)}
          />
        </Box>
        <Text mb={[0, 2]} ml={[2, 0]} fontSize={['0.75em', 'auto']}>
          Vivamus tempus ante a interdum pulvinar. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Integer.
        </Text>
      </Box>
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
      <Lightbox isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} document={document} />
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
