import React from "react";
import { useSelector } from "react-redux";

import { selectProgress } from "../redux/characters";
import { raidDifficultyNames, rewards } from "../model/vault";

export default function VaultRewards() {
  const progress = useSelector(selectProgress);

  if (!progress) {
    return <></>;
  }

  const raidItemLevel = (n: number) => {
    const difficulty = rewards.priorities.find((difficulty) => {
      return progress.raid[difficulty] >= n;
    });


    if (difficulty) {
      return `${raidDifficultyNames[difficulty]}: Item level ${rewards.raid[difficulty].min}`;
    } else {
      return;
    }
  };

  const raid3 = raidItemLevel(3);
  const raid7 = raidItemLevel(7);
  const raid10 = raidItemLevel(10);

  let raid3ClassNames = "col-sm-3 border text-center";
  let raid7ClassNames = raid3ClassNames;
  let raid10ClassNames = raid3ClassNames;

  if (raid3) {
    raid3ClassNames = raid3ClassNames + " table-success";
  }

  if (raid7) {
    raid7ClassNames = raid7ClassNames + " table-success";
  }

  if (raid10) {
    raid10ClassNames = raid10ClassNames + " table-success";
  }

  return (
    <div className="mb-5">
      <h4>The Great Vault</h4>

      <p className="text-muted">The following rewards will be available next week.</p>

      <div className="container-fluid">
        <div className="row">
          <div className="col col-sm-1 border-0 text-right"><strong>Raid</strong></div>
          <div className={raid3ClassNames}>
            3 Bosses<br />
            {raid3 || "Not yet unlocked"}
          </div>
          <div className={raid7ClassNames}>
            7 Bosses<br />
            {raid7 || "Not yet unlocked"}
          </div>
          <div className={raid10ClassNames}>
            10 Bosses<br />
            {raid10 || "Not yet unlocked"}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-1 border-0 text-right"><strong>Mythic&nbsp;Plus</strong></div>
          <div className="col-sm-3 border text-center">1 Dungeon</div>
          <div className="col-sm-3 border text-center">4 Dungeons</div>
          <div className="col-sm-3 border text-center">10 Dungeons</div>
        </div>
      </div>
    </div>
  );
}
