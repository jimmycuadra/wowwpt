import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { useAppDispatch } from "../redux/store";
import { addCharacter } from "../redux/characters";
import { regions } from "../model/region";

interface Props {
  charactersExist: boolean,
  setAddingNewCharacter: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function AddCharacter({ charactersExist, setAddingNewCharacter }: Props) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [realm, setRealm] = useState("");
  const [region, setRegion] = useState("us");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (name.length < 1 || realm.length < 1) {
      return;
    }

    dispatch(addCharacter({
      name,
      realm,
      region,
    }));

    setName("");
    setRealm("");
    setRegion("us");

    setAddingNewCharacter(false);
  }

  return (
    <>
      <p className="text-muted">Add a new character.</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Character name</Form.Label>
          <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="realm">
          <Form.Label>Character realm</Form.Label>
          <Form.Control value={realm} onChange={(e) => setRealm(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="region">
          <Form.Label>Character region</Form.Label>
          <Form.Control as="select" value={region} onChange={(e) => setRegion(e.target.value)}>
            {Object.keys(regions).map((regionCode) => {
              const region = regions[regionCode];

              return <option key={regionCode} value={regionCode}>{region.long}</option>
            })}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">Add character</Button>
        {charactersExist &&
          <>
            &nbsp;
            <Button variant="secondary" type="button" onClick={() => setAddingNewCharacter(false)}>Cancel</Button>
          </>
        }
      </Form>
    </>
  );
}
