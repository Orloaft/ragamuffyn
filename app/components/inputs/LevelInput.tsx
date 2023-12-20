import React from "react";

const LevelInput: React.FC<any> = (props) => {
  // State for storing the input value

  // Handle input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);

    // Check if the new value is within the range 0-99
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 99) {
      props.onChange(event);
    }
  };

  return (
    <div>
      <label>
        Level:
        <input
          name="level"
          type="number"
          defaultValue={props.value}
          onChange={handleChange}
          min="0"
          max="99"
        />
      </label>
    </div>
  );
};

export default LevelInput;
