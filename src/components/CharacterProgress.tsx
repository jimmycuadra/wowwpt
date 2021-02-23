import React from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useAppDispatch } from "../redux/store";
import { shadowlandsDungeons } from "../model/character";
import {
  selectCurrentCharacter,
  selectShadowlandsSeasonOneProgress,
  toggleWeeklyAnima,
  toggleWeeklyMawSouls,
  toggleWeeklyBonusEvent,
  toggleWorldBoss,
} from "../redux/characters";

export default function CharacterProgress() {
  const character = useSelector(selectCurrentCharacter);
  const progress = useSelector(selectShadowlandsSeasonOneProgress);
  const dispatch = useAppDispatch();

  if (!(character && progress)) {
    return <></>;
  }

  let mythicPlusRuns;

  if (progress.mythicPlus.length > 0) {
    mythicPlusRuns = (
      <ul>
        {progress.mythicPlus.map((run) => {
          return (
            <li>{run.dungeon} +{run.level}</li>
          );
        })}
      </ul>
    );
  } else {
    mythicPlusRuns = <></>;
  }

  return (
    <>
      <h3>{character.name}</h3>

      <h4>Quests</h4>

      <Form>
        <Form.Check
          inline
          label="World boss"
          name="worldBoss"
          checked={progress.worldBoss}
          onChange={() => dispatch(toggleWorldBoss())}
        />
        <Form.Check
          inline
          label="Weekly anima quest"
          name="weeklyAnima"
          checked={progress.weeklyAnima}
          onChange={() => dispatch(toggleWeeklyAnima())}
        />
        <Form.Check
          inline
          label="Weekly Maw souls quest"
          name="weeklyMawSouls"
          checked={progress.weeklyMawSouls}
          onChange={() => dispatch(toggleWeeklyMawSouls())}
        />
        <Form.Check
          inline
          label="Weekly bonus event quest"
          name="weeklyBonusEvent"
          checked={progress.weeklyBonusEvent}
          onChange={() => dispatch(toggleWeeklyBonusEvent())}
        />

        <h4>Raid: Castle Nathria</h4>

        <Form.Group controlId="raidLFR">
          <Form.Label>Looking For Raid bosses defeated: {progress.raid.lfr}</Form.Label>
          <Form.Control type="range" min={0} max={10} defaultValue={progress.raid.lfr} />
        </Form.Group>
        <Form.Group controlId="raidNormal">
          <Form.Label>Normal bosses defeated: {progress.raid.normal}</Form.Label>
          <Form.Control type="range" min={0} max={10} defaultValue={progress.raid.normal} />
        </Form.Group>
        <Form.Group controlId="raidHeroic">
          <Form.Label>Heroic bosses defeated: {progress.raid.heroic}</Form.Label>
          <Form.Control type="range" min={0} max={10} defaultValue={progress.raid.heroic} />
        </Form.Group>
        <Form.Group controlId="raidMythic">
          <Form.Label>Mythic bosses defeated: {progress.raid.mythic}</Form.Label>
          <Form.Control type="range" min={0} max={10} defaultValue={progress.raid.mythic} />
        </Form.Group>

        <h4>Mythic Plus Dungeons</h4>

        {mythicPlusRuns}

        <Form.Group controlId="mythicPlusDungeon">
          <Form.Label>Dungeon</Form.Label>
          <Form.Control as="select">
            {shadowlandsDungeons.map((dungeon) => {
              return <option key={dungeon} value={dungeon}>{dungeon}</option>;
            })}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="mythicPlusLevel">
          <Form.Label>Keystone level</Form.Label>
          <Form.Control />
        </Form.Group>
        <Button variant="primary" type="submit">Add M+ dungeon run</Button>
      </Form>
    </>
  );
}
