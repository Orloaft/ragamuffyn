import React from "react";
import ModelDataLookUp from "../ModelDataLookUp";
import { UnorderedList } from "@chakra-ui/react";

const LocationsInput: React.FC<any> = (props) => {
  // State for storing the input value

  return (
    <div>
      <label>
        Locations:
        <UnorderedList style={{ listStyle: "none" }}>
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
        </UnorderedList>
        <ModelDataLookUp
          model="locations"
          addToForm={props.onChange}
          addedData={props.value}
        />
      </label>
    </div>
  );
};

export default LocationsInput;
