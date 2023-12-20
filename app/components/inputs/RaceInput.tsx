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
        <input
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
