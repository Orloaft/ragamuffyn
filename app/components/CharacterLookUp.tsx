import React, { useEffect } from "react";

import { NavLink, useFetcher } from "@remix-run/react";
import axios from "axios";

const CharacterLookUp = ({ campaignId }: { campaignId: string }) => {
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
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    await axios.post(`/characters/${character.id}/add`, {
                      campaignId,
                    });
                  }}
                >
                  {character.name}
                </button>
              </li>
            );
          })}{" "}
        </ul>
      </div>
    );
  }
};

export default CharacterLookUp;
