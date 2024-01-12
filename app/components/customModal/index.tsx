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

const CustomModal = ({ content, title, button, size }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <>
      <IconButton
        background={"black"}
        border={"1px solid #dddddd"}
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
        size={size}
      >
        <ModalOverlay />
        <ModalContent
          marginLeft={title === "Encounter" ? "" : "50%"}
          background={"black"}
          border={"1px solid #dddddd"}
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
