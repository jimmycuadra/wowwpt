import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import "./CharacterProgress.css";
import { useAppDispatch } from "../redux/store";
import { Dungeon, shadowlandsDungeons } from "../model/character";
import { regions } from "../model/region";
import {
  addMythicPlusDungeonRun,
  deleteMythicPlusDungeonRun,
  resetCharacter,
  selectCurrentCharacter,
  selectProgress,
  setRaidLFR,
  setRaidNormal,
  setRaidHeroic,
  setRaidMythic,
  toggleWeeklyAnima,
  toggleWeeklyMawSouls,
  toggleWeeklyBonusEvent,
  toggleWorldBoss,
} from "../redux/characters";

export default function CharacterProgress() {
  const character = useSelector(selectCurrentCharacter);
  const progress = useSelector(selectProgress);
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

  if (!(character && progress)) {
    return <></>;
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
    mythicPlusRuns = <p>No dungeon runs recorded. Use the form to the right to add a new dungeon run.</p>;
  }

  return (
    <>
      <Container fluid className="character-progress">
        <Row>
          <Col>
            <Button variant="danger" className="float-right" onClick={() => {
              if (window.confirm(`Are you sure you want to reset all data for ${character.name}?`)) {
                dispatch(resetCharacter())
              }
            }}>Reset {character.name}</Button>
            <h3>Weekly progress for {character.name}-{character.realm} ({regions[character.region].long})</h3>
          </Col>
        </Row>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xl={4}>
              <h4>Quests</h4>

              <Form.Check
                label="World boss"
                name="worldBoss"
                checked={progress.worldBoss}
                onChange={() => dispatch(toggleWorldBoss())}
              />
              <Form.Check
                label="Weekly anima quest"
                name="weeklyAnima"
                checked={progress.weeklyAnima}
                onChange={() => dispatch(toggleWeeklyAnima())}
              />
              <Form.Check
                label="Weekly Maw souls quest"
                name="weeklyMawSouls"
                checked={progress.weeklyMawSouls}
                onChange={() => dispatch(toggleWeeklyMawSouls())}
              />
              <Form.Check
                label="Weekly bonus event quest"
                name="weeklyBonusEvent"
                checked={progress.weeklyBonusEvent}
                onChange={() => dispatch(toggleWeeklyBonusEvent())}
              />
            </Col>
            <Col>
              <h4>Raid: Castle Nathria</h4>

              <Form.Group controlId="raidLFR">
                <Form.Label>Looking For Raid bosses defeated: {progress.raid.lfr}</Form.Label>
                <Form.Control type="range" min={0} max={10} value={progress.raid.lfr} onChange={(e) => dispatch(setRaidLFR(parseInt(e.target.value, 10)))} />
              </Form.Group>
              <Form.Group controlId="raidNormal">
                <Form.Label>Normal bosses defeated: {progress.raid.normal}</Form.Label>
                <Form.Control type="range" min={0} max={10} value={progress.raid.normal} onChange={(e) => dispatch(setRaidNormal(parseInt(e.target.value, 10)))} />
              </Form.Group>
              <Form.Group controlId="raidHeroic">
                <Form.Label>Heroic bosses defeated: {progress.raid.heroic}</Form.Label>
                <Form.Control type="range" min={0} max={10} value={progress.raid.heroic} onChange={(e) => dispatch(setRaidHeroic(parseInt(e.target.value, 10)))} />
              </Form.Group>
              <Form.Group controlId="raidMythic">
                <Form.Label>Mythic bosses defeated: {progress.raid.mythic}</Form.Label>
                <Form.Control type="range" min={0} max={10} value={progress.raid.mythic} onChange={(e) => dispatch(setRaidMythic(parseInt(e.target.value, 10)))} />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <h4>Mythic Plus Dungeons</h4>
            </Col>
          </Row>
          <Row>
            <Col xl={4}>
              {mythicPlusRuns}

            </Col>
            <Col>
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
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}
