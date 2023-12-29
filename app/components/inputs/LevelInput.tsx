import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React from "react";

const LevelInput: React.FC<any> = (props) => {
  // State for storing the input value

  // Handle input changes
  const handleChange = (event: any) => {
    const newValue = event;

    // Check if the new value is within the range 0-99
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 99) {
      props.onChange({ target: { value: event, name: "level" } });
    }
  };

  return (
    <div>
      <label>
        Level:
        <NumberInput
          name="level"
          defaultValue={props.value}
          onChange={handleChange}
          min={0}
          max={99}
        >
          {" "}
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </label>
    </div>
  );
};

export default LevelInput;
