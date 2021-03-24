import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import axios from 'axios';
import { Box } from '@chakra-ui/react';

import Panel from './Panel';
import useDebounce from '../../utils/useDebounce';

const fetcher = url => axios.get(url).then(({ data }) => data);

const Rasters = ({ year, basemapHandler, activeBasemap }) => {
  const debouncedYear = useDebounce(year, 500);
  const { data: documents, error } = useSWR(
    debouncedYear ? `${process.env.NEXT_PUBLIC_SEARCH_API}/documents?year=${debouncedYear}` : null,
    fetcher
  );

  if (!documents || error) return 'LOADING';

  return (
    <Box>
      {documents.map(d => (
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
