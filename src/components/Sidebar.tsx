import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";

import { useAppDispatch } from "../redux/store";
import {
  deleteAllData,
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

        <p className="text-muted">Manage data</p>

        <div className="mb-sm-3">
          <Button variant="primary" block onClick={() => setAddingNewCharacter(true)}>Add new character</Button>
        </div>

        {character &&
          <>
            <div className="mb-sm-3">
              <Button variant="danger" block onClick={() => {
                if (window.confirm(`Are you sure you want to reset all progress for ${character.name}?`)) {
                  dispatch(resetCharacter())
                }
              }}>Reset progress for {character.name}</Button>
            </div>
            <div className="mb-sm-3">
              <Button variant="danger" block onClick={() => {
                if (window.confirm("Are you sure you want to reset all progress for all characters?")) {
                  dispatch(resetAllCharacters());
                }
              }}>Reset progress for all characters</Button>
            </div>
            <div className="mb-sm-3">
              <Button variant="danger" block onClick={() => {
                if (window.confirm("Are you sure you want to delete all data?")) {
                  dispatch(deleteAllData());
                }
              }}>Delete all data</Button>
            </div>
          </>
        }
      </>
    );
  }
}
