import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import axios from 'axios';
import { last, findLast } from 'lodash';
import { rgb } from 'd3';
import { Box, Grid, Heading, Text } from '@chakra-ui/react';

import Line from './Line.svg';
import style from '../Atlas/style.json';

const getColor = (layer, type) => {
  let layerStyle = style.layers.filter(
    l =>
      l.filter &&
      l['source-layer'] === layer.name &&
      l.filter.find(f => Array.isArray(f) && f[2][0] === type)
  );
  if (!layerStyle.length) layerStyle = style.layers.filter(l => l['source-layer'] === layer.name);
  if (!layerStyle.length) return { backgroundColor: 'white' };
  if (layerStyle[0].paint['fill-color']) {
    let backgroundColor = layerStyle[0].paint['fill-color'];
    let borderColor = layerStyle[0].paint['fill-outline-color'];
    if (!borderColor)
      borderColor = layerStyle[1]
        ? layerStyle[1].paint['fill-color']
        : layerStyle[0].paint['fill-color'];

    [backgroundColor, borderColor] = [backgroundColor, borderColor].map(bColor => {
      if (!bColor) return null;
      let color = bColor;
      if (Array.isArray(color)) color = last(color);
      if (color.match(/^hsl/gi)) color = rgb(color).formatHex();
      return color;
    });
    return {
      borderColor,
      backgroundColor,
      borderWidth: 2,
      m: 1,
    };
  }
  if (layerStyle[0].paint['line-color']) {
    return {
      as: Line,
      color: findLast(layerStyle, lStyle => lStyle.paint['line-color']).paint['line-color'],
      w: '35px',
      ml: '5px',
    };
  }
  return { backgroundColor: 'white' };
};

const fetcher = url => axios.get(url).then(({ data }) => data);

const Legend = ({ year }) => {
  const { data: layers, error } = useSWR(
    `${process.env.NEXT_PUBLIC_SEARCH_API}/layers?year=${year}`,
    fetcher
  );

  if (!layers || error) return 'LOADING';

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
            <Grid templateColumns="45px 1fr" columnGap="10px" rowGap="10px">
              {layer.types.map(type => (
                <React.Fragment key={type}>
                  <Box {...getColor(layer, type)} />
                  <Text>{type}</Text>
                </React.Fragment>
              ))}
            </Grid>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

Legend.propTypes = {
  year: PropTypes.number.isRequired,
};

export default Legend;
