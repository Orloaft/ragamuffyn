import React from "react";
import ModelDataLookUp from "../ModelDataLookUp";

const LocationsInput: React.FC<any> = (props) => {
  // State for storing the input value

  return (
    <div>
      <label>
        Locations:
        <ul>
          {props.value.map((item: any) => {
            return (
              <li key={item}>
                {item}
                <button
                  onClick={() => {
                    props.onChange({
                      target: {
                        name: "locations",
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
          model="locations"
          addToForm={props.addToForm}
          addedData={props.value}
        />
      </label>
    </div>
  );
};

export default LocationsInput;
