import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

const CustomModal = ({ content, title, button, width }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <IconButton
        background={"black"}
        left={title === "Encounter" ? "0" : "10%"}
        zIndex="15"
        colorScheme="grey"
        onClick={onOpen}
        aria-label="edit"
        icon={button}
      ></IconButton>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={title === "Encounter"}
        size={title === "Encounter" ? "half" : "sm"}
      >
        <ModalOverlay />
        <ModalContent
          marginLeft={title === "Encounter" ? "" : "50%"}
          backgroundImage={"url('/marble.avif')"}
          color="#dddddd"
          backgroundRepeat={"no-repeat"}
          backgroundSize={"cover"}
        >
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{content}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
