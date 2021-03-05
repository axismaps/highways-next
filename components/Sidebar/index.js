import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/react';

import Rasters from '../Rasters';

const Sidebar = ({ year, basemapHandler }) => (
  <Box backgroundColor="#eee" p="20px" h="100%" overflow="auto">
    <Rasters year={year} basemapHandler={basemapHandler} />
  </Box>
);

Sidebar.propTypes = {
  year: PropTypes.number.isRequired,
  basemapHandler: PropTypes.func.isRequired,
};

export default Sidebar;
