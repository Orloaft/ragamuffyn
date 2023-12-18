import React, { useState } from "react";

const LevelInput: React.FC<any> = (props) => {
  // State for storing the input value
  const [level, setLevel] = useState<number>(props.value);

  // Handle input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);

    // Check if the new value is within the range 0-99
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 99) {
      setLevel(newValue);
    }
  };

  return (
    <div>
      <label>
        Level:
        <input
          type="number"
          value={level}
          onChange={handleChange}
          min="0"
          max="99"
        />
      </label>
    </div>
  );
};

export default LevelInput;
