import { Input } from "@chakra-ui/react";
import React from "react";

const RaceInput: React.FC<any> = (props) => {
  // State for storing the input value

  // Handle input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event);
  };

  return (
    <div>
      <label>
        Race:
        <Input
          color="black"
          borderRadius=".25rem"
          backgroundColor="#dddddd"
          name="race"
          type="string"
          defaultValue={props.value}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

export default RaceInput;
