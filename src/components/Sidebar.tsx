import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";

import { selectAllCharacters } from "../redux/characters";
import AddCharacter from "./AddCharacter";
import CharacterSelect from "./CharacterSelect";

export default function Sidebar() {
  const characters = useSelector(selectAllCharacters);
  const [addingNewCharacter, setAddingNewCharacter] = useState(false);

  if (addingNewCharacter || characters.length < 1) {
    return <AddCharacter setAddingNewCharacter={setAddingNewCharacter} charactersExist={characters.length > 0} />;
  } else {
    return (
      <>
        <CharacterSelect />

        <Button variant="primary" onClick={() => setAddingNewCharacter(true)}>Add new character</Button>
      </>
    );
  }
}
