import { Button, Input, UnorderedList } from "@chakra-ui/react";
import React, { useState } from "react";

type PlayersInputProps = {
  value: string[];
  onChange: any;
};
const PlayersInput: React.FC<PlayersInputProps> = ({ value, onChange }) => {
  const [newPlayer, setNewPlayer] = useState("");

  const handleAddClick = (e: any) => {
    e.preventDefault();
    onChange({ target: { name: "players", value: [...value, newPlayer] } });
    setNewPlayer(""); // Reset input field after adding
  };
  const removePlayer = (player: string) => {
    onChange({
      target: {
        name: "players",
        value: [...value].filter((p) => p !== player),
      },
    });
  };
  return (
    <div>
      <UnorderedList style={{ listStyle: "none" }}>
        {value.map((player, index) => (
          <li key={index}>
            {player}{" "}
            <button
              onClick={() => {
                removePlayer(player);
              }}
            >
              remove
            </button>
          </li>
        ))}
      </UnorderedList>
      <Input
        type="text"
        value={newPlayer}
        onChange={(e) => setNewPlayer(e.target.value)}
        placeholder="Enter player's name"
      />
      <Button onClick={handleAddClick}>Add Player</Button>
    </div>
  );
};

export default PlayersInput;
