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
import { DataModalPopUp } from "../DataModalPopUp";
import { SearchIcon } from "@chakra-ui/icons";

const InitiativeTracker = ({
  initiativeOrder,
  setInitiativeOrder,
  currentTurn,
}) => {
  const idToModel = (id) => {
    switch (id.charAt(0)) {
      case "H":
        return "characters";
        break;
      case "N":
        return "npcs";
        break;
    }
  };
  const [showInitiative, setShowInitiative] = useState(true);
  return (
    <>
      <Button
        background={"rgba(0,0,0,0.75)"}
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
                background={"rgba(0,0,0,0.75)"}
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
                background={i.tag === currentTurn ? "gray" : "rgba(0,0,0,0.75)"}
                color="#dddddd"
                padding=".5rem"
                width="100%"
              >
                {i.tag ? i.tag : i.name}
              </Tag>
              <DataModalPopUp
                data={i}
                button={<SearchIcon />}
                model={idToModel(i.id)}
              />
            </Flex>
          ))}
        </Flex>
      )}
    </>
  );
};

export default InitiativeTracker;
