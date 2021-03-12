import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Heading, Text } from '@chakra-ui/react';

import style from '../Atlas/style.json';

const getColor = (layer, type) => {
  let layerStyle = style.layers.find(
    l =>
      l.filter &&
      l['source-layer'] === layer.name &&
      l.filter.find(f => Array.isArray(f) && f[2][0] === type)
  );
  if (!layerStyle) layerStyle = style.layers.find(l => l['source-layer'] === layer.name);
  return layerStyle.paint['fill-color'] ?? layerStyle.paint['line-color'];
};

const Legend = ({ layers }) => {
  return (
    <Box>
      <Heading size="md" mb={2}>
        Legend
      </Heading>
      <Box px="15px" py="10px" backgroundColor="white" borderRadius="5px" boxShadow="md">
        {layers.map(layer => (
          <Box key={layer.id}>
            <Heading size="sm" mb={2}>
              {layer.title}
            </Heading>
            <Grid templateColumns="45px 1fr" columnGap="10px" rowGap="10px">
              {layer.types.map(type => (
                <>
                  <Box backgroundColor={getColor(layer, type)} />
                  <Text>{type}</Text>
                </>
              ))}
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

Legend.propTypes = {
  layers: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Legend;
