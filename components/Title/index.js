import React from 'react';
import PropTypes from 'prop-types';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Flex, Heading, IconButton } from '@chakra-ui/react';

const Title = ({ title }) => {
  return (
    <Flex m={[2, 5]} mb={0} alignItems="center" justifyContent="space-between">
      <Heading fontSize={18} color="#002469">
        {title}
      </Heading>
      <IconButton
        size="sm"
        borderRadius="full"
        as="a"
        href="https://spatialstudieslab.rice.edu/houstonproject/highwayswaterways/"
        target="_blank"
        icon={<FontAwesomeIcon icon={faInfo} />}
      />
    </Flex>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

Title.defaultProps = {};

export default Title;
