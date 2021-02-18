import React from "react";

import { BestRunData } from "../db/MythicKeystoneProfile";
import { formatCharacterName, formatDuration } from "../utils/Formatting";

interface Props {
  run: BestRunData,
}

export default function BestRun({ run }: Props) {
  return (
    <tr>
      <td>{run.dungeon.name}</td>
      <td>{run.keystone_level}</td>
      <td>{new Date(run.completed_timestamp).toUTCString()}</td>
      <td>{formatDuration(run.duration)}</td>
      <td>{run.keystone_affixes.map((affix) => affix.name).join(", ")}</td>
      <td>
        <ul>
          {run.members.map((member) => {
            const memberName = formatCharacterName(member.character);

            return <li key={memberName}>{memberName} ({member.race.name} {member.specialization.name})</li>;
          })}
        </ul>
      </td>
    </tr>
  );
}
