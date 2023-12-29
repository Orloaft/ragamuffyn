import React from "react";
import ModelDataLookUp from "../ModelDataLookUp";
import { ListItem, UnorderedList } from "@chakra-ui/react";

const EncountersInput: React.FC<any> = (props) => {
  // State for storing the input value

  return (
    <div>
      <label>
        Encounters:
        <UnorderedList style={{ listStyle: "none" }}>
          {props.value.map((item: any) => {
            return (
              <ListItem key={item}>
                {item}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    props.onChange({
                      target: {
                        name: "encounters",
                        value: [...props.value].filter((i) => i !== item),
                      },
                    });
                  }}
                >
                  remove
                </button>
              </ListItem>
            );
          })}
        </UnorderedList>
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
