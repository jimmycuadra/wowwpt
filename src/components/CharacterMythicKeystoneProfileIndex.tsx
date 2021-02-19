import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

import { RootState, useAppDispatch } from "../data/store";
import { fetchCharacterMythicKeystoneProfileIndex, selectAllCharacterMythicKeystoneProfileIndexByCharacterName } from "../redux/characterMythicKeystoneProfileIndex";
import BestRun from "./BestRun";

interface Props {
  region: string,
  realm: string,
  characterName: string,
  namespace: string,
  locale: string,
  accessToken: string,
}

export default function CharacterMythicKeystoneProfileIndex(props: Props) {
  const dispatch = useAppDispatch();
  const status = useSelector((state: RootState) => state.characterMythicKeystoneProfileIndex.status);
  const profile = useSelector((state: RootState) => selectAllCharacterMythicKeystoneProfileIndexByCharacterName(state, props.characterName, props.realm));
  const error = useSelector((state: RootState) => state.characterMythicKeystoneProfileIndex.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCharacterMythicKeystoneProfileIndex(props));
    }
  }, [status, dispatch, props]);

  let content;

  if (["idle", "loading"].indexOf(status) !== -1) {
    content = (
      <>
        <p>Loading data...</p>
      </>
    );
  } else if (status === "succeeded") {
    if (!profile) {
      content = (
        <p>No profile found in redux store.</p>
      );
    } else if (profile.current_period.best_runs) {
      content = (
        <Table bordered striped>
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
        </Table>
      );
    } else {
      content = <p>No recorded mythic keystone runs during the current period.</p>;
    }
  } else if (status === "failed") {
    content = (
      <>
        <p>Error fetching data: {error}</p>
        <p>Your access token is probably expired. Try logging out and logging in with a new access token.</p>
      </>
    );
  } else {
    throw new Error("unhandled case");
  }

  return (
    <Row>
      <Col>
        <h3 className="h5">Mythic Keystone Profile</h3>
        {content}
      </Col>
    </Row>
  );
}
