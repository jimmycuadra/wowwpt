import React from "react";
import Form from "react-bootstrap/Form";

import { useAppDispatch } from "../redux/store";
import {
  toggleWeeklyAnima,
  toggleWeeklyMawSouls,
  toggleWeeklyVenari,
  toggleWeeklyBonusEvent,
  toggleWorldBoss,
} from "../redux/characters";
import { Progress } from "../model/character";

interface Props {
  progress: Progress,
}

export default function QuestProgress({ progress }: Props) {
  const dispatch = useAppDispatch();

  return (
    <>
      <h4>Quests</h4>

      <Form>
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
          label="Weekly Ve'nari quests"
          name="weeklyVenari"
          checked={progress.weeklyVenari}
          onChange={() => dispatch(toggleWeeklyVenari())}
        />
        <Form.Check
          label="Weekly bonus event quest"
          name="weeklyBonusEvent"
          checked={progress.weeklyBonusEvent}
          onChange={() => dispatch(toggleWeeklyBonusEvent())}
        />
      </Form>
    </>
  );
}
