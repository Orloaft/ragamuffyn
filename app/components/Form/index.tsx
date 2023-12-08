// components/CharacterForm.tsx

import React, { useState } from "react";
import type { Character } from "../../characters";
import { Form } from "@remix-run/react";

const CharacterForm: React.FC = () => {
  const [character, setCharacter] = useState<Character>({
    name: "",
    race: "",
    class: "",
    level: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setCharacter({ ...character, [e.target.name]: e.target.value });
  };

  return (
    <Form method="post" action="/characters">
      <div>
        <label htmlFor="name">Name:</label>
        <input
          name="name"
          type="text"
          value={character.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="race">Race:</label>
        <input
          name="race"
          type="text"
          value={character.race}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="class">Class:</label>
        <input
          name="class"
          type="text"
          value={character.class}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="level">Level:</label>
        <input
          name="level"
          type="number"
          value={character.level}
          onChange={handleChange}
          min="1"
        />
      </div>
      <button type="submit">Submit</button>
    </Form>
  );
};

export default CharacterForm;
