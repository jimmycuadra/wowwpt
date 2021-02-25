import React from "react";
import Form from "react-bootstrap/Form";

import { useAppDispatch } from "../redux/store";
import {
  setRaidLFR,
  setRaidNormal,
  setRaidHeroic,
  setRaidMythic,
} from "../redux/characters";
import { Progress } from "../model/character";

interface Props {
  progress: Progress,
}

export default function RaidProgress({ progress }: Props) {
  const dispatch = useAppDispatch();

  return (
    <>
      <h4>Raid: Castle Nathria</h4>

      <Form>
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
      </Form>
    </>
  );
}
