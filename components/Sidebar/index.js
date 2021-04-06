import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

import Rasters from '../Rasters';
import Legend from '../Legend';

const Sidebar = ({ year, activeBasemap, basemapHandler }) => {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [activeBasemap]);

  return (
    <>
      <IconButton
        icon={open ? <ChevronLeftIcon fontSize={24} /> : <ChevronRightIcon fontSize={24} />}
        pos="absolute"
        left={open ? 300 : 0}
        zIndex={10}
        top={40}
        backgroundColor="#eee"
        borderRadius="0 5px 5px 0"
        size="lg"
        w="30px"
        minW="none"
        boxShadow="sm"
        onClick={() => setOpen(!open)}
        display={['block', 'none']}
      />
      <Box
        backgroundColor="#eee"
        p="20px"
        h={['calc(100vh - 149px)', '100%']}
        overflowY="auto"
        overflowX="visible"
        pos={['absolute', 'static']}
        boxShadow={['md', 'none']}
        left={open ? 0 : '-100%'}
        zIndex={1}
        transition="all 250ms"
      >
        <Rasters year={year} basemapHandler={basemapHandler} activeBasemap={activeBasemap} />
        <Legend year={year} />
      </Box>
    </>
  );
};

Sidebar.propTypes = {
  year: PropTypes.number.isRequired,
  basemapHandler: PropTypes.func.isRequired,
  activeBasemap: PropTypes.string,
};

Sidebar.defaultProps = {
  activeBasemap: null,
};

export default Sidebar;
