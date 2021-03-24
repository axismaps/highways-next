import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import axios from 'axios';
import { Box, Flex, Spacer, Heading, Text, Button, Image } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '@chakra-ui/icons';

import Opacity from './Opacity';
import Lightbox from './Lightbox';

const fetcher = url => axios.get(url).then(({ data }) => data);
const basemapFetcher = url =>
  axios.get(url).then(({ data: { features } }) => features[0].properties);

const Viewer = ({ year, activeBasemap, opacityHandler, basemapHandler }) => {
  const { data: document, error } = useSWR(
    `${process.env.NEXT_PUBLIC_SEARCH_API}/document/${activeBasemap}`,
    basemapFetcher
  );
  const { data: documents } = useSWR(
    `${process.env.NEXT_PUBLIC_SEARCH_API}/documents?year=${year}`,
    fetcher
  );

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [type, setType] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    if (documents) {
      setType(documents.find(d => d.Documents.find(v => v.ssid === activeBasemap)));
    }
  }, [documents, activeBasemap]);

  useEffect(() => {
    if (type) {
      setCurrentIndex(type.Documents.findIndex(t => t.ssid === activeBasemap));
    }
  }, [type, activeBasemap]);

  const changeView = step => {
    let nextIndex = currentIndex + step;
    if (nextIndex >= type.Documents.length) nextIndex = 0;
    else if (nextIndex < 0) nextIndex = type.Documents.length - 1;
    basemapHandler(type.Documents[nextIndex].ssid);
  };

  if (!document || !documents || error) return 'LOADING';

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
        <Box pos="relative" mb={2} maxWidth={['25%', '100%']}>
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${document.ssid}/medium.jpg`}
            onClick={() => setLightboxOpen(true)}
          />
        </Box>
        {document.creator && (
          <Text mb={[0, 2]} ml={[2, 0]} fontSize={['0.75em', 'auto']}>
            {document.creator}
          </Text>
        )}
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
  year: PropTypes.number.isRequired,
  activeBasemap: PropTypes.string.isRequired,
  opacityHandler: PropTypes.func.isRequired,
  basemapHandler: PropTypes.func.isRequired,
};

export default Viewer;
