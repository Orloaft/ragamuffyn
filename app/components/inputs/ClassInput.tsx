import React, { useState } from "react";

const ClassInput: React.FC<any> = (props) => {
  // State for storing the input value
  const [classValue, setClassValue] = useState<string>(props.value);

  // Handle input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClassValue(event.target.value);
  };

  return (
    <div>
      <label>
        Class:
        <input type="string" value={classValue} onChange={handleChange} />
      </label>
    </div>
  );
};

export default ClassInput;
