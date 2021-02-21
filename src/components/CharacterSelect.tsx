import React from "react";
import Nav from "react-bootstrap/Nav";
import { useSelector } from "react-redux";

import { selectAllCharacters } from "../redux/characters";
import AddCharacter from "./AddCharacter";
import { regions } from "../model/character";

export default function CharacterSelect() {
  const characters = useSelector(selectAllCharacters);

  const charactersContent = characters.map((character) => {
    return (
      <Nav.Item as="li" key={`${character.name}-${character.realm}-${character.region}`}>
        <Nav.Link>
          {character.name}-{character.realm} ({regions[character.region]})
        </Nav.Link>
      </Nav.Item>
    );
  });

  return (
    <>
      {characters.length > 0 && <p className="text-muted">Select a character.</p>}
      <Nav as="ul" className="flex-column">
        {charactersContent}
      </Nav>
      <AddCharacter />
    </>
  );
}
