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

  const mythicPlusSorted = [...progress.mythicPlus];

  mythicPlusSorted.sort((a, b) => {
    if (b.level > a.level) {
      return 1;
    } else if (a.level > b.level) {
      return -1;
    } else {
      return 0;
    }
  });

  const mythicPlusItemLevel = (n: number) => {
    if (mythicPlusSorted.length < n) {
      return;
    }

    const keyLevel = mythicPlusSorted[n - 1].level;
    const rewardLevel = keyLevel > rewards.mythicPlus.maxKeyLevel ?
      rewards.mythicPlus.maxItemLevel :
      rewards.mythicPlus[keyLevel];

    return `+${keyLevel}: Item level ${rewardLevel}`;
  };

  const raid3 = raidItemLevel(3);
  const raid6 = raidItemLevel(6);
  const raid9 = raidItemLevel(9);

  const mythicPlus1 = mythicPlusItemLevel(1);
  const mythicPlus4 = mythicPlusItemLevel(4);
  const mythicPlus10 = mythicPlusItemLevel(10);

  const defaultClassNames = "col-sm-2 border text-center";
  const successClass = " table-success";

  const raid3ClassNames = raid3 ? defaultClassNames + successClass : defaultClassNames;
  const raid6ClassNames = raid6 ? defaultClassNames + successClass : defaultClassNames;
  const raid9ClassNames = raid9 ? defaultClassNames + successClass : defaultClassNames;

  const mythicPlus1ClassNames = mythicPlus1 ? defaultClassNames + successClass : defaultClassNames;
  const mythicPlus4ClassNames = mythicPlus4 ? defaultClassNames + successClass : defaultClassNames;
  const mythicPlus10ClassNames = mythicPlus10 ? defaultClassNames + successClass : defaultClassNames;

  return (
    <>
      <h4>The Great Vault</h4>

      <p className="text-muted">The following rewards will be available next week.</p>

      <div className="container-fluid">
        <div className="row">
          <div className="col col-sm-1 border-0 text-right"><strong>Raid</strong></div>
          <div className={raid3ClassNames}>
            3 Bosses<br />
            {raid3 || "Not yet unlocked"}
          </div>
          <div className={raid6ClassNames}>
            7 Bosses<br />
            {raid6 || "Not yet unlocked"}
          </div>
          <div className={raid9ClassNames}>
            9 Bosses<br />
            {raid9 || "Not yet unlocked"}
          </div>
        </div>
        <div className="row">
          <div className="col col-sm-1 border-0 text-right"><strong>Mythic&nbsp;Plus</strong></div>
          <div className={mythicPlus1ClassNames}>
            1 Dungeon<br />
            {mythicPlus1 || "Not yet unlocked"}
          </div>
          <div className={mythicPlus4ClassNames}>
            4 Dungeons<br />
            {mythicPlus4 || "Not yet unlocked"}
          </div>
          <div className={mythicPlus10ClassNames}>
            10 Dungeons<br />
            {mythicPlus10 || "Not yet unlocked"}
          </div>
        </div>
      </div>
    </>
  );
}
