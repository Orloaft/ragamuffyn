import React from "react";

import ModelDataLookUp from "../ModelDataLookUp";
import { UnorderedList } from "@chakra-ui/react";

const CharactersInput: React.FC<any> = (props) => {
  // State for storing the input value

  return (
    <div>
      <label>
        Npcs:
        <UnorderedList style={{ listStyle: "none" }}>
          {props.value.map((char: any) => {
            return (
              <li key={char}>
                {char}
                <button
                  onClick={() => {
                    props.onChange({
                      target: {
                        name: "npcs",
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
        </UnorderedList>
        <ModelDataLookUp
          addToForm={props.onChange}
          addedData={props.value}
          model="npcs"
        />
      </label>
    </div>
  );
};

export default CharactersInput;
