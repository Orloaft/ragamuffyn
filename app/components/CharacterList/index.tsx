import type { character } from "@prisma/client";
import { Form, NavLink, useFetcher } from "@remix-run/react";
import { useState } from "react";
import CharacterLookUp from "../CharacterLookUp";
function determinePath(modelId: string) {
  // Check the first character of the modelId
  const firstChar = modelId.charAt(0).toUpperCase();

  // Map the first character to the corresponding path
  switch (firstChar) {
    case "C":
      return `/campaigns/${modelId}`;
    case "N":
      return `/npcs/${modelId}`;
    case "H":
      return `/characters/${modelId}`;
    case "I":
      return `/items/${modelId}`;
    case "L":
      return `/locations/${modelId}`;
    case "E":
      return `/encounters/${modelId}`;
    default:
      return `/`;
  }
}
export default function CharacterList({
  characters,
  modelId,
}: {
  characters: character[];
  modelId: string;
}) {
  const [modal, setModal] = useState<boolean>(false);
  const fetcher = useFetcher<any>();

  const refreshFormData = () => {
    fetcher.load(determinePath(modelId));

    setModal(false);
  };

  return (
    <div>
      {" "}
      <nav>
        {characters && characters.length ? (
          <ul>
            {characters.map((character: any) => (
              <li key={character.id}>
                <NavLink to={`/characters/${character.id}`}>
                  {character.name}
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            <i>No characters</i>
          </p>
        )}
      </nav>
      <Form method="post" action="/characters">
        <button type="submit">New</button>
      </Form>
      <button
        onClick={(e) => {
          e.preventDefault();
          setModal(true);
        }}
      >
        Add
      </button>
      {modal && (
        <CharacterLookUp
          modelId={modelId}
          addedCharacters={characters}
          submit={refreshFormData}
        />
      )}
    </div>
  );
}
