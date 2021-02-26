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
  const raidProgress = progress.raid;
  const min = 0;
  const max = 10;

  function handleChange(inputValue: string, currentValue: number, callback: Function) {
    let value = parseInt(inputValue, 10);

    if (isNaN(value)) {
      return dispatch(callback(currentValue));
    } else if (value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    }

    dispatch(callback(value));
  }

  return (
    <>
      <h4>Raid: Castle Nathria</h4>

      <Form>
        <Form.Group controlId="raidLFR">
          <Form.Label>Looking For Raid bosses defeated</Form.Label>
          <Form.Control type="number" min={min} max={max} value={raidProgress.lfr} onChange={(e) => handleChange(e.target.value, raidProgress.lfr, setRaidLFR)} />
        </Form.Group>
        <Form.Group controlId="raidNormal">
          <Form.Label>Normal bosses defeated</Form.Label>
          <Form.Control type="number" min={min} max={max} value={raidProgress.normal} onChange={(e) => handleChange(e.target.value, raidProgress.normal, setRaidNormal)} />
        </Form.Group>
        <Form.Group controlId="raidHeroic">
          <Form.Label>Heroic bosses defeated</Form.Label>
          <Form.Control type="number" min={min} max={max} value={raidProgress.heroic} onChange={(e) => handleChange(e.target.value, raidProgress.heroic, setRaidHeroic)} />
        </Form.Group>
        <Form.Group controlId="raidMythic">
          <Form.Label>Mythic bosses defeated</Form.Label>
          <Form.Control type="number" min={min} max={max} value={raidProgress.mythic} onChange={(e) => handleChange(e.target.value, raidProgress.mythic, setRaidMythic)} />
        </Form.Group>
      </Form>
    </>
  );
}
