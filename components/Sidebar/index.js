import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';

import Rasters from '../Rasters';

const Sidebar = ({ year, activeBasemap, basemapHandler, documents }) => (
  <Box backgroundColor="#eee" p="20px" h="100%" overflow="auto">
    <Rasters
      year={year}
      basemapHandler={basemapHandler}
      activeBasemap={activeBasemap}
      documents={documents}
    />
  </Box>
);

Sidebar.propTypes = {
  year: PropTypes.number.isRequired,
  basemapHandler: PropTypes.func.isRequired,
  activeBasemap: PropTypes.string,
  documents: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

Sidebar.defaultProps = {
  activeBasemap: null,
};

export default Sidebar;
