import React from "react";
import ModelDataLookUp from "../ModelDataLookUp";
import { UnorderedList } from "@chakra-ui/react";

const ItemsInput: React.FC<any> = (props) => {
  // State for storing the input value

  return (
    <div>
      <label>
        Items:
        <UnorderedList
          style={{ listStyle: "none", padding: "10px" }}
          color="#dddddd"
        >
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
        </UnorderedList>
        <ModelDataLookUp
          addToForm={props.onChange}
          addedData={props.value}
          model="items"
        />
      </label>
    </div>
  );
};

export default ItemsInput;
