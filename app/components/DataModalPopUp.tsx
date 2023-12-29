import {
  useDisclosure,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Modal,
  IconButton,
} from "@chakra-ui/react";

import DataEntryView from "./DataEntryView";

export const DataModalPopUp = ({ data, button, model }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        onClick={(e) => {
          e.preventDefault();
          onOpen();
        }}
        aria-label="add"
        icon={button}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{data.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <DataEntryView data={data} type={model} useStore={false} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
