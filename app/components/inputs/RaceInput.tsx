import React, { useState } from "react";

const RaceInput: React.FC<any> = (props) => {
  // State for storing the input value
  const [race, setRace] = useState<string>(props.value);

  // Handle input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRace(event.target.value);
  };

  return (
    <div>
      <label>
        Race:
        <input name="race" type="string" value={race} onChange={handleChange} />
      </label>
    </div>
  );
};

export default RaceInput;
