import React, { useEffect } from "react";

import { NavLink, useFetcher } from "@remix-run/react";

const CharacterLookUp = () => {
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
            return (
              <li key={character.id}>
                <NavLink to={`/characters/${character.id}`}>
                  {character.name}
                </NavLink>
              </li>
            );
          })}{" "}
        </ul>
      </div>
    );
  }
};

export default CharacterLookUp;
