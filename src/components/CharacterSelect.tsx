import React from "react";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";

import "./CharacterSelect.css";
import { useAppDispatch } from "../redux/store";
import { chooseCharacter, selectAllCharacters, selectCurrentCharacter } from "../redux/characters";
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
