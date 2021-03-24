import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Heading,
  Image,
  Text,
  Button,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

const Lightbox = ({ isOpen, onClose, document }) => (
  <Modal isOpen={isOpen} onClose={onClose} size="6xl">
    <ModalOverlay />
    <ModalContent maxW="95vw">
      <ModalHeader />
      <ModalCloseButton />
      <ModalBody>
        <Image
          maxH="75vh"
          margin="auto"
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${document.ssid}/full.jpg`}
        />
      </ModalBody>
      <ModalFooter justifyContent="flex-start">
        <Box>
          <Heading size="sm">{document.title}</Heading>
          {document.creator && <Text>{document.creator}</Text>}
          {document.creditline && (
            <Text fontStyle="italic" fontSize="0.9em">
              {document.creditline}
            </Text>
          )}
        </Box>
        {document.artstor && (
          <>
            <Spacer />
            <Button
              as="a"
              href={`${process.env.NEXT_PUBLIC_ARTSTOR_URL}/${document.artstor}`}
              target="_blank"
            >
              View on Artstor
            </Button>
          </>
        )}
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
