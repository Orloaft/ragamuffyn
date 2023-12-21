import React from "react";
import ModelDataLookUp from "../ModelDataLookUp";

const EncountersInput: React.FC<any> = (props) => {
  // State for storing the input value

  return (
    <div>
      <label>
        Encounters:
        <ul>
          {props.value.map((item: any) => {
            return (
              <li key={item}>
                {item}
                <button
                  onClick={() => {
                    props.onChange({
                      target: {
                        name: "items",
                        value: [...props.value].filter((i) => i !== item),
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
          model="encounters"
        />
      </label>
    </div>
  );
};

export default EncountersInput;
