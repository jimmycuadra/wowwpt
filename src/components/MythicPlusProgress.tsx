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
  }

  let mythicPlusRuns;

  if (progress.mythicPlus.length > 0) {
    mythicPlusRuns = (
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
      </div>
    );
  } else {
    mythicPlusRuns = <></>;
  }

  return (
    <>
      <h4>Mythic Plus Dungeons</h4>
      {mythicPlusRuns}
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
      </Form>
    </>
  );
}
