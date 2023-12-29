import { SearchIcon } from "@chakra-ui/icons";
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
  ListItem,
  UnorderedList,
  Flex,
} from "@chakra-ui/react";
import IdToEntry from "./IdToEntry";
import { DataModalPopUp } from "./DataModalPopUp";

export const ModalPopUp = ({ model, data, button, addedData, addToForm }) => {
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
          <ModalHeader>{model}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UnorderedList style={{ listStyle: "none" }}>
              {(data.length &&
                data.map((char: any) => {
                  if (addedData.find((e: any) => e === char.id)) {
                    return null; // Skip this item
                  } else {
                    return (
                      <ListItem key={char.id}>
                        <Flex justify={"space-between"} gap={"1rem"}>
                          <IdToEntry model={model} id={char.id} />
                          <Flex>
                            {" "}
                            <DataModalPopUp
                              model={model}
                              data={JSON.parse(char.data)}
                              button={<SearchIcon />}
                            />
                            <IconButton
                              onClick={(e) => {
                                e.preventDefault();
                                addToForm({
                                  target: {
                                    name: model,
                                    value: [...addedData, char.id],
                                  },
                                });
                              }}
                              aria-label="add"
                              icon={button}
                            />
                          </Flex>
                        </Flex>
                      </ListItem>
                    );
                  }
                })) || <ListItem>no {model}</ListItem>}
            </UnorderedList>
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