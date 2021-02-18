import React, { useEffect, useState } from 'react';

import { Profile } from "../db/MythicKeystoneProfile";
import BestRun from "./BestRun";
import { formatCharacterName } from "../utils/Formatting";

interface Props {
  region: string,
  realm: string,
  character: string,
  namespace: string,
  locale: string,
  accessToken: string,
}

interface State {
  profile: Profile | null,
  error: string | null
}

export default function MythicKeystoneProfile(props: Props) {
  const [data, setData] = useState<State>({
    profile: null,
    error: null,
  });

  useEffect(() => {
    (async () => {
      let response = await fetch(
        `https://${props.region}.api.blizzard.com/profile/wow/character/${props.realm}/${props.character}/mythic-keystone-profile?namespace=${props.namespace}&locale=${props.locale}`,
        {
          headers: {
            "Authorization": `Bearer ${props.accessToken}`
          }
        }
      );

      if (response.ok) {
        let profileData = await response.json();

        setData({
          profile: profileData,
          error: null,
        });
      } else {
        setData({
          profile: null,
          error: `${response.status} ${response.statusText}`,
        });
      }
    })();
  }, [props.region, props.realm, props.character, props.namespace, props.locale, props.accessToken]);

  if (data.error) {
    return (
      <div>
        <p>Error from Blizzard API: {data.error}</p>
        <p>Your access token is probably expired. Try logging out and logging in with a new access token.</p>
      </div>
    );
  } else if (data.profile) {
    return (
      <div>
        <h1>Mythic Keystone Profile for {formatCharacterName(data.profile.character)}</h1>
        <table>
          <tr>
            <th>Dungeon</th>
            <th>Level</th>
            <th>Time</th>
            <th>Affixes</th>
            <th>Party</th>
          </tr>
          {data.profile.current_period.best_runs.map((bestRun) => <BestRun run={bestRun} />)}
        </table>
      </div>
    );
  } else {
    return <div>Loading mythic keystone profile data...</div>;
  }
}
