import React, { useEffect } from 'react';
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "../db/store";
import { fetchProfile, selectAllProfiles } from "../reducers/MythicKeystoneProfile";
import BestRun from "./BestRun";
import { formatCharacterName } from "../utils/Formatting";

interface Props {
  region: string,
  realm: string,
  characterName: string,
  namespace: string,
  locale: string,
  accessToken: string,
}

export default function MythicKeystoneProfile(props: Props) {
  const dispatch = useAppDispatch();
  const profileStatus = useSelector((state: RootState) => state.mythicKeystoneProfiles.status);
  const profile = useSelector(selectAllProfiles)[0];
  const error = useSelector((state: RootState) => state.mythicKeystoneProfiles.error);

  useEffect(() => {
    if (profileStatus === "idle") {
      dispatch(fetchProfile(props));
    }
  }, [profileStatus, dispatch, props]);

  if (["idle", "loading"].indexOf(profileStatus) !== -1) {
    return <div>Loading mythic keystone profile data...</div>;
  } else if (profileStatus === "succeeded") {
    return (
      <div>
        <h1>Mythic Keystone Profile for {formatCharacterName(profile.character)}</h1>
        <table>
          <thead>
            <tr>
              <th>Dungeon</th>
              <th>Level</th>
              <th>Completed At</th>
              <th>Completed In</th>
              <th>Affixes</th>
              <th>Party</th>
            </tr>
          </thead>
          <tbody>
            {profile.current_period.best_runs.map((bestRun) => <BestRun run={bestRun} key={bestRun.completed_timestamp} />)}
          </tbody>
        </table>
      </div>
    );
  } else if (profileStatus === "failed") {
    return (
      <div>
        <p>Error fetching data: {error}</p>
        <p>Your access token is probably expired. Try logging out and logging in with a new access token.</p>
      </div>
    );
  } else {
    throw new Error("unhandled case");
  }
}
