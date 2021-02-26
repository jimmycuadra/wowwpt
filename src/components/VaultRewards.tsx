import React from "react";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";

import { selectProgress } from "../redux/characters";

export default function VaultRewards() {
  const progress = useSelector(selectProgress);

  if (!progress) {
    return <></>;
  }

  return (
    <div className="mb-5">
      <h4>The Great Vault</h4>

      <p className="text-muted">The following rewards will be available next week.</p>

      <Table>
        <tr>
          <th className="col-sm-1 border-0 text-right">Raid</th>
          <td className="border text-center">3 Bosses</td>
          <td className="border text-center">7 Bosses</td>
          <td className="border text-center">10 Bosses</td>
        </tr>
        <tr>
          <th className="col-sm-1 border-0 text-right">Mythic Plus</th>
          <td className="border text-center">1 Dungeon</td>
          <td className="border text-center">4 Dungeons</td>
          <td className="border text-center">10 Dungeons</td>
        </tr>
      </Table>
    </div>
  );
}
