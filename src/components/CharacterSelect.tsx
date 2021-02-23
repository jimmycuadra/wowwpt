import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";

import "./CharacterSelect.css";
import { useAppDispatch } from "../redux/store";
import { chooseCharacter, resetAllCharacters, selectAllCharacters, selectCurrentCharacter } from "../redux/characters";
import AddCharacter from "./AddCharacter";
import { regions } from "../model/region";

export default function CharacterSelect() {
  const dispatch = useAppDispatch();
  const characters = useSelector(selectAllCharacters);
  const currentCharacter = useSelector(selectCurrentCharacter);

  const charactersContent = characters.map((character) => {
    return (
      <option key={character.id} value={character.id}>
        {`${character.name}-${character.realm} (${regions[character.region].short})`}
      </option>
    );
  });

  const characterSelect = (
    <>
      <p className="text-muted">Select a character.</p>

      <Form className="character-select-section">
        <Form.Control as="select" value={currentCharacter ? currentCharacter.id : characters[0].id} onChange={(e) => {
          const id = parseInt(e.target.value, 10);

          if (isNaN(id)) {
            throw new Error("ID of selected character is not a number.");
          } else {
            dispatch(chooseCharacter(id))
          }
        }}>
          {charactersContent}
        </Form.Control>
      </Form>

      <div className="character-select-section">
        <p className="text-muted">Reset all characters.</p>

        <Button variant="danger" onClick={() => {
          if (window.confirm("Are you sure you want to reset weekly progress for all characters?")) {
            dispatch(resetAllCharacters());
          }
        }}>Reset all characters</Button>
      </div>
    </>
  );

  return (
    <>
      <h3>Characters</h3>

      {characters.length > 0 && characterSelect}

      <AddCharacter />
    </>
  );
}
