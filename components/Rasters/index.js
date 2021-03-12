import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';

import Panel from './Panel';

const Rasters = ({ year, basemapHandler, activeBasemap, documents }) => (
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

Rasters.propTypes = {
  year: PropTypes.number.isRequired,
  basemapHandler: PropTypes.func.isRequired,
  activeBasemap: PropTypes.string,
  documents: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

Rasters.defaultProps = {
  activeBasemap: null,
};

export default Rasters;
