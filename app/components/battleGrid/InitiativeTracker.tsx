import React, { useState } from "react";
import {
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tag,
  Button,
} from "@chakra-ui/react";

const InitiativeTracker = ({
  initiativeOrder,
  setInitiativeOrder,
  currentTurn,
}) => {
  const [showInitiative, setShowInitiative] = useState(true);
  return (
    <>
      <Button
        background={"black"}
        color={"#dddddd"}
        onClick={() => setShowInitiative(() => !showInitiative)}
      >
        {showInitiative ? "Hide" : "Initiative"}
      </Button>
      {showInitiative && (
        <Flex direction="column">
          {initiativeOrder.map((i, index) => (
            <Flex key={i.id + index} justifyContent="space-between">
              <NumberInput
                background="black"
                color="#dddddd"
                width="fit-content"
                value={i.damageTrack || 0}
                onChange={(valueAsString) => {
                  const newOrder = initiativeOrder.map((item, idx) => {
                    if (idx === index) {
                      return {
                        ...item,
                        damageTrack: parseInt(valueAsString, 10) || 0,
                      };
                    }
                    return item;
                  });
                  setInitiativeOrder(newOrder);
                }}
                min={-9999}
                max={9999}
                step={1}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Tag
                background={i.tag === currentTurn ? "gray" : "black"}
                color="#dddddd"
                padding=".5rem"
                width="100%"
              >
                {i.tag ? i.tag : i.name}
              </Tag>
            </Flex>
          ))}
        </Flex>
      )}
    </>
  );
};

export default InitiativeTracker;
