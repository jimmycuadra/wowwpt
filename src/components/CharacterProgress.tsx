import React from "react";
import { useSelector } from "react-redux";

import { selectCurrentCharacter } from "../redux/characters";

export default function CharacterProgress() {
  const character = useSelector(selectCurrentCharacter);

  if (!character) {
    return <h3>No character selected</h3>;
  }

  return (
    <>
      <h3>{character.name}</h3>
    </>
  );
}
