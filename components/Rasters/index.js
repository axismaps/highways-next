import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import axios from 'axios';
import { Box } from '@chakra-ui/react';

import Panel from './Panel';

const fetcher = year =>
  axios.get(`${process.env.NEXT_PUBLIC_SEARCH_API}/documents?year=${year}`).then(res => res.data);

const Rasters = ({ year, basemapHandler, activeBasemap }) => {
  const { data, error } = useSWR(year, fetcher);
  if (!data || error) return 'BOO';
  return (
    <Box>
      {data.map(d => (
        <Panel
          key={`${year}${d.title}`}
          title={d.title}
          documents={d.Documents}
          basemapHandler={basemapHandler}
          activeBasemap={activeBasemap}
        />
      ))}
    </Box>
  );
};

Rasters.propTypes = {
  year: PropTypes.number.isRequired,
  basemapHandler: PropTypes.func.isRequired,
  activeBasemap: PropTypes.string,
};

Rasters.defaultProps = {
  activeBasemap: null,
};

export default Rasters;
