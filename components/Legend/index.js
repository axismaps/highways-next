import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import axios from 'axios';
import { Box, Flex, Spacer, Heading, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

import getColor from './getColor';
import Loading from '../Loading';
import useDebounce from '../../utils/useDebounce';

const fetcher = url => axios.get(url).then(({ data }) => data);

const Legend = ({ year, layerHandler, highlightedLayer }) => {
  const debouncedYear = useDebounce(year, 500);
  const { data: layers, error } = useSWR(
    debouncedYear ? `${process.env.NEXT_PUBLIC_SEARCH_API}/layers?year=${debouncedYear}` : null,
    fetcher
  );

  const isLayerActive = (layer, type) =>
    highlightedLayer && highlightedLayer.layer === layer.name && highlightedLayer.type === type;

  if (!layers || error) return <Loading />;

  return (
    <Box>
      <Heading size="md" mb={2}>
        Legend
      </Heading>
      <Box px="15px" pb="10px" pt="1px" backgroundColor="white" borderRadius="5px" boxShadow="md">
        {layers.map(layer => (
          <Box key={layer.id}>
            <Heading size="sm" mt={4} mb={2}>
              {layer.title}
            </Heading>
            {layer.types.map(type => {
              const active = isLayerActive(layer, type);
              return (
                <Flex
                  key={type}
                  alignItems="center"
                  p="5px"
                  pr="10px"
                  borderRadius="5px"
                  lineHeight={1.25}
                  backgroundColor={active ? '#eee' : 'none'}
                  cursor="pointer"
                  onClick={() => layerHandler(active ? null : { layer: layer.name, type })}
                >
                  <Box {...getColor(layer, type)} w="40px" h="20px" mr="10px" />
                  <Text>{type}</Text>
                  <Spacer />
                  <Box ml="5px" color="#666">
                    <FontAwesomeIcon
                      icon={faWindowClose}
                      visibility={active ? 'visible' : 'hidden'}
                    />
                  </Box>
                </Flex>
              );
            })}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

Legend.propTypes = {
  year: PropTypes.number.isRequired,
  layerHandler: PropTypes.func.isRequired,
  highlightedLayer: PropTypes.shape({
    layer: PropTypes.string,
    type: PropTypes.string,
  }),
};

Legend.defaultProps = {
  highlightedLayer: null,
};

export default Legend;
