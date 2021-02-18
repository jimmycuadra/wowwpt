import React from "react";

import { BestRunData } from "./MythicKeystoneProfile";
import { formatCharacterName, formatDuration } from "./Formatting";

interface Props {
  run: BestRunData,
}

export default function BestRun({ run }: Props) {
  return (
    <tr>
      <td>{run.dungeon.name}</td>
      <td>{run.keystone_level}</td>
      <td>{formatDuration(run.duration)}</td>
      <td>{run.keystone_affixes.map((affix) => affix.name).join(", ")}</td>
      <td>
        <ul>
          {run.members.map((member) =>
            <li>{formatCharacterName(member.character)} ({member.race.name} {member.specialization.name})</li>
          )}
        </ul>
      </td>
    </tr>
  );
}
