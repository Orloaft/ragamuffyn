import React from "react";
import CharacterLookUp from "../CharacterLookUp";

const CharactersInput: React.FC<any> = (props) => {
  // State for storing the input value

  return (
    <div>
      <label>
        Characters:
        <ul>
          {props.value.map((char: any) => {
            return (
              <li key={char}>
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
              </li>
            );
          })}
        </ul>
        <CharacterLookUp
          addToForm={props.onChange}
          addedCharacters={props.value}
        />
      </label>
    </div>
  );
};

export default CharactersInput;
