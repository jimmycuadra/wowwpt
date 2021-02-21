import React from "react";
import Nav from "react-bootstrap/Nav";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../redux/store";
import { chooseCharacter, selectAllCharacters } from "../redux/characters";
import AddCharacter from "./AddCharacter";
import { regions } from "../model/character";

export default function CharacterSelect() {
  const dispatch = useAppDispatch();
  const characters = useSelector(selectAllCharacters);

  const charactersContent = characters.map((character) => {
    return (
      <Nav.Item as="li" key={character.id}>
        <Nav.Link onClick={() => dispatch(chooseCharacter(character.id))}>
          {character.name}-{character.realm} ({regions[character.region]})
        </Nav.Link>
      </Nav.Item>
    );
  });

  const characterSelect = (
    <>
      <p className="text-muted">Select a character.</p>

      <Nav as="ul" className="flex-column">
        {charactersContent}
      </Nav>
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
