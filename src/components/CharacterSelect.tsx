import React from "react";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";

import "./CharacterSelect.css";
import { useAppDispatch } from "../redux/store";
import { chooseCharacter, selectAllCharacters, selectCurrentCharacter } from "../redux/characters";
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
      <p className="text-muted">Select a character</p>

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
    </>
  );

  return (
    <>
      <h4>Characters</h4>

      {characters.length > 0 && characterSelect}
    </>
  );
}
