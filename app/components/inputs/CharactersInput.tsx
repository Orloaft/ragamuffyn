import React from "react";

import ModelDataLookUp from "../ModelDataLookUp";
import { ListItem, UnorderedList } from "@chakra-ui/react";

const CharactersInput: React.FC<any> = (props) => {
  // State for storing the input value

  return (
    <div>
      <label>
        Characters:
        <UnorderedList
          backgroundImage={"url('/marble.avif')"}
          style={{ listStyle: "none", padding: "10px" }}
          color="#dddddd"
        >
          {props.value.map((char: any) => {
            return (
              <ListItem key={char}>
                {char}
                <button
                  onClick={() => {
                    props.onChange({
                      target: {
                        name: "characters",
                        value: [...props.value].filter((i) => i !== char),
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
          model="characters"
        />
      </label>
    </div>
  );
};

export default CharactersInput;
