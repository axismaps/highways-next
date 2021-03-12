import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Heading,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

const Lightbox = ({ isOpen, onClose, document }) => (
  <Modal isOpen={isOpen} onClose={onClose} size="2xl">
    <ModalOverlay />
    <ModalContent>
      <ModalHeader />
      <ModalCloseButton />
      <ModalBody>
        <Image
          maxH="75vh"
          maxW="75vw"
          margin="auto"
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${document.ssid}/full.jpg`}
        />
      </ModalBody>
      <ModalFooter justifyContent="flex-start">
        <Box>
          <Heading size="sm">{document.title}</Heading>
          <Text>
            Vivamus tempus ante a interdum pulvinar. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Integer.
          </Text>
        </Box>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

Lightbox.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  document: PropTypes.shape().isRequired,
};

export default Lightbox;
