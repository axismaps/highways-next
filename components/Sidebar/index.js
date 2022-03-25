import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

import Rasters from '../Rasters';
import Legend from '../Legend';
import Thematic from '../Thematic';
import Animation from '../Animation';

const Sidebar = ({
  year,
  activeBasemap,
  basemapHandler,
  layerHandler,
  highlightedLayer,
  activeThematic,
  thematicHandler,
  activeAnimation,
  animationHandler,
  animationFrame,
  animationFrameHandler,
}) => {
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
        <Thematic year={year} activeThematic={activeThematic} thematicHandler={thematicHandler} />
        <Animation
          year={year}
          activeAnimation={activeAnimation}
          animationHandler={animationHandler}
          animationFrame={animationFrame}
          animationFrameHandler={animationFrameHandler}
        />
        <Legend year={year} layerHandler={layerHandler} highlightedLayer={highlightedLayer} />
      </Box>
    </>
  );
};

Sidebar.propTypes = {
  year: PropTypes.number.isRequired,
  basemapHandler: PropTypes.func.isRequired,
  layerHandler: PropTypes.func.isRequired,
  highlightedLayer: PropTypes.shape(),
  activeBasemap: PropTypes.string,
  activeThematic: PropTypes.shape(),
  thematicHandler: PropTypes.func.isRequired,
  activeAnimation: PropTypes.shape(),
  animationHandler: PropTypes.func.isRequired,
  animationFrame: PropTypes.number,
  animationFrameHandler: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
  activeBasemap: null,
  highlightedLayer: null,
  activeThematic: null,
  activeAnimation: null,
  animationFrame: 0,
};

export default Sidebar;
