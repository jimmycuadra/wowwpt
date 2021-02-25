import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";

import { useAppDispatch } from "../redux/store";
import {
  resetAllCharacters,
  resetCharacter,
  selectAllCharacters,
  selectCurrentCharacter,
} from "../redux/characters";
import AddCharacter from "./AddCharacter";
import CharacterSelect from "./CharacterSelect";

export default function Sidebar() {
  const characters = useSelector(selectAllCharacters);
  const character = useSelector(selectCurrentCharacter);
  const dispatch = useAppDispatch();
  const [addingNewCharacter, setAddingNewCharacter] = useState(false);

  if (addingNewCharacter || characters.length < 1) {
    return <AddCharacter setAddingNewCharacter={setAddingNewCharacter} charactersExist={characters.length > 0} />;
  } else {
    return (
      <>
        <CharacterSelect />

        <p className="text-muted">Manage characters</p>

        <div className="character-select-section">
          <Button variant="primary" onClick={() => setAddingNewCharacter(true)}>Add new character</Button>
        </div>

        {character &&
          <>
            <div className="character-select-section">
              <Button variant="danger" onClick={() => {
                if (window.confirm(`Are you sure you want to reset all data for ${character.name}?`)) {
                  dispatch(resetCharacter())
                }
              }}>Reset {character.name}</Button>
            </div>
            <div className="character-select-section">
              <Button variant="danger" onClick={() => {
                if (window.confirm("Are you sure you want to reset weekly progress for all characters?")) {
                  dispatch(resetAllCharacters());
                }
              }}>Reset all characters</Button>
            </div>
          </>
        }
      </>
    );
  }
}
