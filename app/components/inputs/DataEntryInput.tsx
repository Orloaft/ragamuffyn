import React from "react";
import ModelDataLookUp from "../ModelDataLookUp";

const DataEntryInput: React.FC<any> = (props) => {
  // State for storing the input value

  return (
    <div>
      <label>
        {props.model}:
        <ul>
          {props.value.map((char: any) => {
            return (
              <li key={char}>
                {char}
                <button
                  onClick={() => {
                    props.onChange({
                      target: {
                        name: props.model,
                        value: [...props.value].filter((i) => i !== char),
                      },
                    });
                  }}
                >
                  remove
                </button>
              </li>
            );
          })}
        </ul>
        <ModelDataLookUp
          addToForm={props.onChange}
          addedData={props.value}
          model={props.model}
        />
      </label>
    </div>
  );
};

export default DataEntryInput;
