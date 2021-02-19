import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "../data/store";
import { fetchAccountProfileSummary, selectMaxLevelCharacters } from "../redux/characters";
import CharacterMythicKeystoneProfileIndex from "./CharacterMythicKeystoneProfileIndex";

interface Props {
  region: string,
  namespace: string,
  locale: string,
  accessToken: string,
}

export default function Characters(props: Props) {
  const dispatch = useAppDispatch();
  const status = useSelector((state: RootState) => state.characters.status);
  const characters = useSelector(selectMaxLevelCharacters);
  const error = useSelector((state: RootState) => state.characters.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAccountProfileSummary(props));
    }
  }, [status, dispatch, props]);

  let content;

  if (["idle", "loading"].indexOf(status) !== -1) {
    content = (
      <>
        <h1 className="h3">Characters</h1>
        <p>Loading data...</p>
      </>
    );
  } else if (status === "succeeded") {
    content = (
      <>
        <h1 className="h3">Characters</h1>
        {characters.map((character) => {
          return (
            <React.Fragment key={character.id}>
              <h2 className="h4">{character.name}</h2>
              <CharacterMythicKeystoneProfileIndex region={props.region} realm={character.realm.slug} characterName={character.name.toLowerCase()} namespace={`profile-${props.region}`} locale={props.locale} accessToken={props.accessToken} />
            </React.Fragment>
          );
        })}
      </>
    );
  } else if (status === "failed") {
    content = (
      <>
        <h1 className="h3">Characters</h1>
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
        {content}
      </Col>
    </Row>
  );
}
