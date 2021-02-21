import React from "react";
import { useSelector } from "react-redux";

import { selectAllCharacters } from "../redux/characters";
import AddCharacter from "./AddCharacter";
import { regions } from "../model/character";

export default function CharacterSelect() {
  const characters = useSelector(selectAllCharacters);

  const charactersContent = characters.map((character) => {
    return (
      <li key={`${character.name}-${character.realm}-${character.region}`}>
        {character.name}-{character.realm} ({regions[character.region]})
      </li>
    );
  });

  return (
    <>
      {characters.length > 0 && <p className="text-muted">Select a character.</p>}
      <ul>
        {charactersContent}
      </ul>
      <AddCharacter />
    </>
  );
}
