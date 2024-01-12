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
  Tooltip,
} from "@chakra-ui/react";

import IdToEntry from "./IdToEntry";

export const DataModalPopUp = ({ data, button, model }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {" "}
      <Tooltip label="details" openDelay={500}>
        <IconButton
          background={"black"}
          border={"1px solid #dddddd"}
          color="#dddddd"
          onClick={(e) => {
            e.preventDefault();
            onOpen();
          }}
          aria-label="details"
          icon={button}
        />
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          background={"black"}
          border={"1px solid #dddddd"}
          color="#dddddd"
        >
          <ModalHeader>{data.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <IdToEntry id={data.id} model={model} isList={false} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
