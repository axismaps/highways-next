import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import axios from 'axios';
import { Box, Flex, Spacer, Heading, Text, Button, Image } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '@chakra-ui/icons';

import Opacity from './Opacity';
import Lightbox from './Lightbox';
import Loading from '../Loading';
import useDebounce from '../../utils/useDebounce';

const fetcher = url => axios.get(url).then(({ data }) => data);
const basemapFetcher = url =>
  axios.get(url).then(({ data: { features } }) => features[0].properties);

const Viewer = ({ year, activeBasemap, opacityHandler, basemapHandler }) => {
  const debouncedYear = useDebounce(year, 500);
  const { data: document, error } = useSWR(
    `${process.env.NEXT_PUBLIC_SEARCH_API}/document/${activeBasemap}`,
    basemapFetcher
  );
  const { data: documents } = useSWR(
    debouncedYear ? `${process.env.NEXT_PUBLIC_SEARCH_API}/documents?year=${debouncedYear}` : null,
    fetcher
  );

  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!document || !documents || error) return <Loading />;

  const type = documents.find(d => d.Documents.find(v => v.ssid === activeBasemap));
  const currentIndex = type.Documents.findIndex(t => t.ssid === activeBasemap);

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
