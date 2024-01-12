import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Button,
  VStack,
  Textarea,
} from "@chakra-ui/react";

export interface CharacterSheet {
  race: string;
  class: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  abilities: string;
}

const races = ["Human", "Elf", "Dwarf", "Halfling", "Orc"];
const classes = ["Warrior", "Mage", "Rogue", "Cleric", "Ranger"];
function calculateModifier(attribute: number): string {
  const modifier = Math.floor((attribute - 10) / 2);
  return modifier >= 0 ? `+${modifier}` : `${modifier}`;
}
const CharacterForm: React.FC<any> = ({ characterData, setCharacterData }) => {
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCharacterData({ ...characterData, [name]: value });
  };

  const handleNumberChange = (
    valueAsString: string,
    valueAsNumber: number,
    name: string
  ) => {
    setCharacterData({ ...characterData, [name]: valueAsNumber });
  };

  return (
    <Box color="#dddddd">
      <VStack spacing={4}>
        <FormControl id="race">
          <FormLabel>Race</FormLabel>
          <Select
            name="race"
            value={characterData.race}
            onChange={handleChange}
            placeholder="Select race"
          >
            {races.map((race) => (
              <option key={race} value={race}>
                {race}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl id="class">
          <FormLabel>Class</FormLabel>
          <Select
            name="class"
            value={characterData.class}
            onChange={handleChange}
            placeholder="Select class"
          >
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl id="strength">
          <FormLabel>
            Strength {calculateModifier(characterData.strength)}
          </FormLabel>
          <NumberInput
            name="strength"
            value={characterData.strength}
            min={1}
            max={20}
            onChange={(valueString, valueNumber) =>
              handleNumberChange(valueString, valueNumber, "strength")
            }
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>
        <FormControl id="dexterity">
          <FormLabel>
            Dexterity {calculateModifier(characterData.dexterity)}
          </FormLabel>
          <NumberInput
            name="dexterity"
            value={characterData.dexterity}
            min={1}
            max={20}
            onChange={(valueString, valueNumber) =>
              handleNumberChange(valueString, valueNumber, "dexterity")
            }
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>

        <FormControl id="constitution">
          <FormLabel>
            Constitution {calculateModifier(characterData.constitution)}
          </FormLabel>
          <NumberInput
            name="constitution"
            value={characterData.constitution}
            min={1}
            max={20}
            onChange={(valueString, valueNumber) =>
              handleNumberChange(valueString, valueNumber, "constitution")
            }
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>

        <FormControl id="intelligence">
          <FormLabel>
            Intelligence {calculateModifier(characterData.intelligence)}
          </FormLabel>
          <NumberInput
            name="intelligence"
            value={characterData.intelligence}
            min={1}
            max={20}
            onChange={(valueString, valueNumber) =>
              handleNumberChange(valueString, valueNumber, "intelligence")
            }
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>

        <FormControl id="wisdom">
          <FormLabel>
            Wisdom {calculateModifier(characterData.wisdom)}
          </FormLabel>
          <NumberInput
            name="wisdom"
            value={characterData.wisdom}
            min={1}
            max={20}
            onChange={(valueString, valueNumber) =>
              handleNumberChange(valueString, valueNumber, "wisdom")
            }
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>

        <FormControl id="charisma">
          <FormLabel>
            Charisma {calculateModifier(characterData.charisma)}
          </FormLabel>
          <NumberInput
            name="charisma"
            value={characterData.charisma}
            min={1}
            max={20}
            onChange={(valueString, valueNumber) =>
              handleNumberChange(valueString, valueNumber, "charisma")
            }
          >
            <NumberInputField />
          </NumberInput>
        </FormControl>
        <FormControl id="abilities">
          <FormLabel>Abilities</FormLabel>
          <Textarea
            name="abilities"
            value={characterData.abilities}
            onChange={(e) =>
              setCharacterData(() => {
                return { ...characterData, abilities: e.target.value };
              })
            }
          ></Textarea>
        </FormControl>
      </VStack>
    </Box>
  );
};

export default CharacterForm;
