import type { character } from "@prisma/client";
import { Form, NavLink } from "@remix-run/react";
import { useState } from "react";
import CharacterLookUp from "../CharacterLookUp";

export default function CharacterList({
  characters,
}: {
  characters: character[];
}) {
  const [modal, setModal] = useState<boolean>(false);
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
      {modal && <CharacterLookUp />}
    </div>
  );
}
