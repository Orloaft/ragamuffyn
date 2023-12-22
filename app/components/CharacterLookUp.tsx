import React, { useEffect } from "react";
import { useFetcher } from "@remix-run/react";

const CharacterLookUp = ({
  addedCharacters,
  addToForm,
}: {
  addedCharacters: any[];
  addToForm: any;
}) => {
  const fetcher = useFetcher<any>();
  useEffect(() => {
    fetcher.load("/collections/characters");
  }, []);
  if (fetcher.state === "loading") {
    return <div>Loading characters...</div>; // Show loading state
  } else if (fetcher.data) {
    let { characters } = fetcher.data;

    return (
      <div>
        <ul>
          {characters.map((char: any) => {
            if (
              addedCharacters &&
              addedCharacters.find((i: any) => i === char.id)
            ) {
              return null;
            } else {
              return (
                <li key={char.id}>
                  <button
                    onClick={async (e) => {
                      e.preventDefault();

                      addToForm({
                        target: {
                          name: "characters",
                          value: [...addedCharacters, char.id],
                        },
                      });
                    }}
                  >
                    {char.name}
                  </button>
                </li>
              );
            }
          })}{" "}
        </ul>
      </div>
    );
  }
};

export default CharacterLookUp;
