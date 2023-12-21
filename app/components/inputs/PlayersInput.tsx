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
      <ul>
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
      </ul>
      <input
        type="text"
        value={newPlayer}
        onChange={(e) => setNewPlayer(e.target.value)}
        placeholder="Enter player's name"
      />
      <button onClick={handleAddClick}>Add Player</button>
    </div>
  );
};

export default PlayersInput;
