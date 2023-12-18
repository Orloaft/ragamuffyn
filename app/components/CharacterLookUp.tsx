import React, { useEffect } from "react";

import { useFetcher } from "@remix-run/react";
import axios from "axios";

const CharacterLookUp = ({
  modelId,
  addedCharacters,
  submit,
}: {
  modelId: string;
  addedCharacters: any[];
  submit: any;
}) => {
  const fetcher = useFetcher<any>();
  useEffect(() => {
    fetcher.load("/characters");
  }, []);

  if (fetcher.state === "loading") {
    return <div>Loading characters...</div>; // Show loading state
  } else if (fetcher.data) {
    let { characters } = fetcher.data;

    return (
      <div>
        <ul>
          {characters.map((character: any) => {
            if (
              addedCharacters &&
              addedCharacters.find((c) => c.id === character.id)
            ) {
              return null;
            } else {
              return (
                <li key={character.id}>
                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      await axios.post(`/characters/${character.id}`, {
                        modelId,
                      });
                      submit();
                    }}
                  >
                    {character.name}
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
