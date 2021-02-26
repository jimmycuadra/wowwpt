import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useAppDispatch } from "../redux/store";
import { Dungeon, shadowlandsDungeons } from "../model/character";
import {
  addMythicPlusDungeonRun,
  deleteMythicPlusDungeonRun,
} from "../redux/characters";
import { Progress } from "../model/character";

interface Props {
  progress: Progress,
}

export default function MythicPlusProgress({ progress }: Props) {
  const dispatch = useAppDispatch();
  const [dungeon, setDungeon] = useState("De Other Side" as Dungeon);
  const [level, setLevel] = useState(2);
  const [addingNewRun, setAddingNewRun] = useState(false);
  const heading = <h4>Mythic Plus Dungeons</h4>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (level < 2) {
      alert("Keystone level must be at least 2.");
      return;
    }

    dispatch(addMythicPlusDungeonRun({
      dungeon,
      level,
    }));

    setDungeon("De Other Side" as Dungeon);
    setLevel(2);

    setAddingNewRun(false);
  }

  if (addingNewRun || progress.mythicPlus.length < 1) {
    return (
      <>
        {heading}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="mythicPlusDungeon">
            <Form.Label>Dungeon</Form.Label>
            <Form.Control as="select" value={dungeon} onChange={((e) => setDungeon(e.target.value as Dungeon))}>
              {shadowlandsDungeons.map((d) => {
                return <option key={d} value={d}>{d}</option>;
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="mythicPlusLevel">
            <Form.Label>Keystone level</Form.Label>
            <Form.Control
              value={level}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);

              setLevel(isNaN(value) ? 2 : value);
            }}
            />
          </Form.Group>
          <Button variant="primary" type="submit">Add M+ dungeon run</Button>
          {progress.mythicPlus.length > 0 &&
            <>
              &nbsp;
              <Button variant="secondary" type="button" onClick={() => setAddingNewRun(false)}>Cancel</Button>
            </>
          }
        </Form>
      </>
    );
  }

  const mythicPlusRuns = (
    <div className="table-responsive">
      <table className="table align-middle">
        <thead>
          <tr>
            <th>Dungeon</th>
            <th>Keystone level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {progress.mythicPlus.map((run, index) => {
            return (
              <tr key={index}>
                <td>{run.dungeon}</td>
                <td>{run.level}</td>
                <td><Button variant="danger" size="sm" onClick={() => {
                  if (window.confirm("Are you sure you want to delete this Mythic Plus dungeon run?")) {
                    dispatch(deleteMythicPlusDungeonRun(index))
                  }
                }}>Delete</Button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button variant="primary" onClick={() => setAddingNewRun(true)}>Add another M+ dungeon run</Button>
    </div>
  );

  return (
    <>
      {heading}
      {mythicPlusRuns}
    </>
  );
}
