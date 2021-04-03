import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import axios from 'axios';
import { Box, Grid, Heading, Text } from '@chakra-ui/react';

import getColor from './getColor';
import Loading from '../Loading';
import useDebounce from '../../utils/useDebounce';

const fetcher = url => axios.get(url).then(({ data }) => data);

const Legend = ({ year }) => {
  const debouncedYear = useDebounce(year, 500);
  const { data: layers, error } = useSWR(
    debouncedYear ? `${process.env.NEXT_PUBLIC_SEARCH_API}/layers?year=${debouncedYear}` : null,
    fetcher
  );

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
