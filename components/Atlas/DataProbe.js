import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from '@chakra-ui/react';

const DataProbe = props => (
  <Box pos="absolute" top={props.top} left={props.left} bg="white" p={2} boxShadow="md">
    {props.name && <Text>{props.name}</Text>}
    <Text>{`Value: ${props.value}`}</Text>
  </Box>
);

DataProbe.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
};

DataProbe.defaultProps = {
  name: null,
  value: null,
};

export default DataProbe;
