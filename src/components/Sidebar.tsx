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
    return <AddCharacter setAddingNewCharacter={setAddingNewCharacter} />;
  } else {
    return (
      <>
        <CharacterSelect />

        <p className="text-muted">Add a new character.</p>

        <Button variant="primary" onClick={() => setAddingNewCharacter(true)}>Add character</Button>
      </>
    );
  }
}
