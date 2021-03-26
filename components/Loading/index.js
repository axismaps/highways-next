import React from 'react';
import { Spinner } from '@chakra-ui/react';

const Loading = () => (
  <Spinner
    thickness="4px"
    speed="0.65s"
    emptyColor="gray.200"
    color="blue.500"
    size="xl"
    display="block"
    mx="auto"
    my={10}
  />
);

export default Loading;
