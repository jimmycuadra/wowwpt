import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";

import "./CharacterSelect.css";
import { useAppDispatch } from "../redux/store";
import { chooseCharacter, resetAllCharacters, selectAllCharacters, selectCurrentCharacter } from "../redux/characters";
import AddCharacter from "./AddCharacter";
import { regions } from "../model/character";

export default function CharacterSelect() {
  const dispatch = useAppDispatch();
  const characters = useSelector(selectAllCharacters);
  const currentCharacter = useSelector(selectCurrentCharacter);

  const charactersContent = characters.map((character) => {
    const checked = currentCharacter && currentCharacter.id === character.id;

    return (
      <Form.Check
        type="radio"
        key={character.id}
        value={character.id}
        id={`character-${character.id}`}
        name="id"
        label={`${character.name}-${character.realm} (${regions[character.region]})`}
        onChange={() => dispatch(chooseCharacter(character.id))}
        checked={checked}
        className={checked ? "checked" : ""}
      />
    );
  });

  const characterSelect = (
    <>
      <p className="text-muted">Select a character.</p>

      <Form className="character-select-form">
        {charactersContent}
      </Form>

      <div className="reset-all">
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
